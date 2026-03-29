# ETI Educom Website - Deployment Guide
## For Hostinger VPS (etieducom.com)

---

## Prerequisites

- SSH access to your Hostinger VPS
- Node.js 18+ installed
- MongoDB 6+ installed
- Nginx installed
- PM2 installed globally (`npm install -g pm2`)

---

## Step 1: Connect to Your VPS

```bash
ssh root@your-vps-ip
# or
ssh root@etieducom.com
```

---

## Step 2: Prepare the Directory

```bash
# Create or clean the deployment directory
sudo mkdir -p /var/www/etiwebsite
cd /var/www/etiwebsite

# If updating, backup first
sudo cp -r /var/www/etiwebsite /var/www/etiwebsite_backup_$(date +%Y%m%d)
```

---

## Step 3: Upload the Code

### Option A: Using Git (Recommended)
```bash
cd /var/www/etiwebsite
git clone https://github.com/YOUR_USERNAME/eti-website.git .
# or if exists
git pull origin main
```

### Option B: Using SCP (From your local machine)
```bash
# Run this from your local machine
scp -r /path/to/frontend-nextjs root@etieducom.com:/var/www/etiwebsite/
scp -r /path/to/backend root@etieducom.com:/var/www/etiwebsite/
```

### Option C: Using FileZilla/SFTP
1. Connect to your VPS via SFTP
2. Navigate to `/var/www/etiwebsite`
3. Upload the `frontend-nextjs` and `backend` folders

---

## Step 4: Setup Backend

```bash
cd /var/www/etiwebsite/backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cat > .env << 'EOF'
MONGO_URL=mongodb://etiUser:EtiSecure2025@localhost:27017/eti_educom?authSource=admin
DB_NAME=eti_educom
EOF
```

---

## Step 5: Setup Frontend (Next.js)

```bash
cd /var/www/etiwebsite/frontend-nextjs

# Install dependencies
npm install
# or
yarn install

# Create .env file
cat > .env << 'EOF'
NEXT_PUBLIC_API_URL=https://etieducom.com
EOF

# Build for production
npm run build
# or
yarn build
```

---

## Step 6: Configure PM2 (Process Manager)

```bash
# Create PM2 ecosystem file
cat > /var/www/etiwebsite/ecosystem.config.js << 'EOF'
module.exports = {
  apps: [
    {
      name: 'eti-backend',
      cwd: '/var/www/etiwebsite/backend',
      script: 'venv/bin/uvicorn',
      args: 'server:app --host 0.0.0.0 --port 8001',
      interpreter: 'none',
      env: {
        MONGO_URL: 'mongodb://etiUser:EtiSecure2025@localhost:27017/eti_educom?authSource=admin',
        DB_NAME: 'eti_educom'
      }
    },
    {
      name: 'eti-frontend',
      cwd: '/var/www/etiwebsite/frontend-nextjs',
      script: 'npm',
      args: 'start',
      env: {
        PORT: 3000,
        NODE_ENV: 'production'
      }
    }
  ]
};
EOF

# Start applications
cd /var/www/etiwebsite
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## Step 7: Configure Nginx

```bash
# Create Nginx config
sudo cat > /etc/nginx/sites-available/etieducom << 'EOF'
server {
    listen 80;
    server_name etieducom.com www.etieducom.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name etieducom.com www.etieducom.com;
    
    # SSL certificates (adjust paths as per your SSL setup)
    ssl_certificate /etc/letsencrypt/live/etieducom.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/etieducom.com/privkey.pem;
    
    # SSL settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    
    # Backend API
    location /api/ {
        proxy_pass http://127.0.0.1:8001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }
    
    # Frontend (Next.js)
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Static files caching
    location /_next/static {
        proxy_pass http://127.0.0.1:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
EOF

# Enable the site
sudo ln -sf /etc/nginx/sites-available/etieducom /etc/nginx/sites-enabled/

# Remove default site if exists
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx config
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

---

## Step 8: Setup SSL (If not already done)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d etieducom.com -d www.etieducom.com

# Auto-renewal test
sudo certbot renew --dry-run
```

---

## Step 9: Setup MongoDB User (If not done)

```bash
# Connect to MongoDB
mongosh

# Switch to admin database
use admin

# Create user for ETI database
db.createUser({
  user: "etiUser",
  pwd: "EtiSecure2025",
  roles: [
    { role: "readWrite", db: "eti_educom" }
  ]
})

# Exit
exit
```

---

## Step 10: Verify Deployment

```bash
# Check PM2 status
pm2 status

# Check backend
curl http://localhost:8001/api/health

# Check frontend
curl http://localhost:3000

# Check via domain
curl https://etieducom.com/api/health
```

---

## Useful Commands

```bash
# View logs
pm2 logs eti-backend
pm2 logs eti-frontend

# Restart services
pm2 restart all

# Rebuild frontend after changes
cd /var/www/etiwebsite/frontend-nextjs
yarn build
pm2 restart eti-frontend

# Check Nginx errors
sudo tail -f /var/log/nginx/error.log
```

---

## Troubleshooting

### "Failed to save" in Admin Panel
- Check MongoDB authentication:
```bash
mongosh "mongodb://etiUser:EtiSecure2025@localhost:27017/eti_educom?authSource=admin"
```

### 502 Bad Gateway
- Check if services are running: `pm2 status`
- Check backend logs: `pm2 logs eti-backend`

### Nginx Configuration Issues
```bash
# Check active configurations
ls -la /etc/nginx/sites-enabled/

# Test config
sudo nginx -t

# View error log
sudo tail -50 /var/log/nginx/error.log
```

---

## Admin Panel Access

- **URL**: https://etieducom.com/admin
- **Password**: `etieducom@admin2025`

---

## Support

For technical support, contact:
- **Email**: helpdesk@etieducom.com
- **Technical**: krishna@etieducom.com

---

*Last Updated: March 2026*
