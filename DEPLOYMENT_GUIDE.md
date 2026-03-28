# ETI Educom - Deployment Guide for Hostinger VPS

## Prerequisites
- Hostinger VPS with Ubuntu 20.04/22.04
- SSH access to your server
- Domain pointing to your VPS IP (etieducom.com)

---

## Step 1: Connect to Your VPS

```bash
ssh root@your-vps-ip
# Or
ssh root@etieducom.com
```

---

## Step 2: Install Required Software

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install Yarn
npm install -g yarn

# Install PM2 (Process Manager)
npm install -g pm2

# Install Python 3 and pip
sudo apt install -y python3 python3-pip python3-venv

# Install MongoDB (if not using external MongoDB)
# Skip if using MongoDB Atlas
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod

# Install Nginx
sudo apt install -y nginx
```

---

## Step 3: Setup MongoDB Authentication

```bash
# Connect to MongoDB
mongosh

# Create admin user
use admin
db.createUser({
  user: "etiAdmin",
  pwd: "YourSecurePassword123",
  roles: ["root"]
})

# Create database user
use eti_educom
db.createUser({
  user: "etiUser",
  pwd: "EtiSecure2025",
  roles: [{ role: "readWrite", db: "eti_educom" }]
})

exit
```

Enable authentication in MongoDB:
```bash
sudo nano /etc/mongod.conf
```

Add/modify:
```yaml
security:
  authorization: enabled
```

Restart MongoDB:
```bash
sudo systemctl restart mongod
```

---

## Step 4: Upload Your Application

### Option A: Using Git (Recommended)
```bash
cd /var/www
git clone https://github.com/your-repo/etiwebsite.git
cd etiwebsite
```

### Option B: Using SCP/SFTP
Upload your files to `/var/www/etiwebsite/`

---

## Step 5: Setup Backend

```bash
cd /var/www/etiwebsite/backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
nano .env
```

Add to `.env`:
```env
MONGO_URL=mongodb://etiUser:EtiSecure2025@localhost:27017/eti_educom?authSource=eti_educom
DB_NAME=eti_educom
```

Test backend:
```bash
source venv/bin/activate
uvicorn server:app --host 0.0.0.0 --port 8001
# Press Ctrl+C after confirming it works
```

---

## Step 6: Setup Frontend (Next.js)

```bash
cd /var/www/etiwebsite/frontend-nextjs

# Create .env file
nano .env
```

Add to `.env`:
```env
NEXT_PUBLIC_API_URL=https://etieducom.com
```

Build the application:
```bash
yarn install
yarn build
```

---

## Step 7: Setup PM2 Process Manager

Create PM2 ecosystem file:
```bash
nano /var/www/etiwebsite/ecosystem.config.js
```

Add:
```javascript
module.exports = {
  apps: [
    {
      name: 'eti-backend',
      cwd: '/var/www/etiwebsite/backend',
      script: 'venv/bin/uvicorn',
      args: 'server:app --host 0.0.0.0 --port 8001',
      interpreter: 'none',
      env: {
        MONGO_URL: 'mongodb://etiUser:EtiSecure2025@localhost:27017/eti_educom?authSource=eti_educom',
        DB_NAME: 'eti_educom'
      }
    },
    {
      name: 'eti-frontend',
      cwd: '/var/www/etiwebsite/frontend-nextjs',
      script: 'yarn',
      args: 'start',
      interpreter: 'none',
      env: {
        PORT: 3000,
        NEXT_PUBLIC_API_URL: 'https://etieducom.com'
      }
    }
  ]
};
```

Start applications:
```bash
cd /var/www/etiwebsite
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## Step 8: Configure Nginx

Create Nginx configuration:
```bash
sudo nano /etc/nginx/sites-available/etieducom
```

Add:
```nginx
server {
    listen 80;
    server_name etieducom.com www.etieducom.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name etieducom.com www.etieducom.com;

    # SSL certificates (will be added by Certbot)
    ssl_certificate /etc/letsencrypt/live/etieducom.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/etieducom.com/privkey.pem;

    # API routes - proxy to backend
    location /api/ {
        proxy_pass http://127.0.0.1:8001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # All other routes - proxy to Next.js
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/etieducom /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default  # Remove default site
sudo nginx -t  # Test configuration
sudo systemctl restart nginx
```

---

## Step 9: Setup SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d etieducom.com -d www.etieducom.com

# Auto-renewal is set up automatically
```

---

## Step 10: Configure Firewall

```bash
sudo ufw allow 22      # SSH
sudo ufw allow 80      # HTTP
sudo ufw allow 443     # HTTPS
sudo ufw enable
```

---

## Verification Steps

1. **Check PM2 processes:**
   ```bash
   pm2 status
   ```

2. **Check backend logs:**
   ```bash
   pm2 logs eti-backend
   ```

3. **Check frontend logs:**
   ```bash
   pm2 logs eti-frontend
   ```

4. **Test API:**
   ```bash
   curl https://etieducom.com/api/health
   ```

5. **Visit your website:**
   Open https://etieducom.com in your browser

---

## Troubleshooting

### MongoDB Connection Failed
```bash
# Check MongoDB status
sudo systemctl status mongod

# Check MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log

# Verify connection
mongosh "mongodb://etiUser:EtiSecure2025@localhost:27017/eti_educom?authSource=eti_educom"
```

### Nginx Errors
```bash
# Test config
sudo nginx -t

# Check error logs
sudo tail -f /var/log/nginx/error.log
```

### PM2 Issues
```bash
# Restart all apps
pm2 restart all

# View logs
pm2 logs

# Delete and restart
pm2 delete all
pm2 start ecosystem.config.js
```

---

## Updating the Application

```bash
cd /var/www/etiwebsite

# Pull latest changes (if using Git)
git pull

# Rebuild frontend
cd frontend-nextjs
yarn install
yarn build

# Restart PM2
pm2 restart all
```

---

## Quick Commands Reference

| Command | Description |
|---------|-------------|
| `pm2 status` | Check running processes |
| `pm2 logs` | View all logs |
| `pm2 restart all` | Restart all apps |
| `sudo systemctl restart nginx` | Restart Nginx |
| `sudo systemctl restart mongod` | Restart MongoDB |
| `sudo certbot renew` | Renew SSL certificates |

---

## Support

If you face any issues, check:
1. PM2 logs: `pm2 logs`
2. Nginx logs: `sudo tail -f /var/log/nginx/error.log`
3. MongoDB logs: `sudo tail -f /var/log/mongodb/mongod.log`

---

**Last Updated:** December 2025
