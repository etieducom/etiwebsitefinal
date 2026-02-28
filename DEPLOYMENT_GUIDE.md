# ETI Educom - Deployment Guide for Hostinger VPS

## Prerequisites
- Hostinger VPS with Ubuntu 20.04/22.04
- SSH access to your server
- Domain pointed to your VPS IP (etieducom.com)

---

## Step 1: Download the Latest Code

Download the `etieducom_latest.zip` file from the Emergent platform.

---

## Step 2: Connect to Your VPS

```bash
ssh root@your-vps-ip
# or
ssh your-username@your-vps-ip
```

---

## Step 3: Install Required Software (First Time Only)

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install Python 3.10+ and pip
sudo apt install -y python3 python3-pip python3-venv

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx

# Install unzip
sudo apt install -y unzip
```

---

## Step 4: Setup Directory Structure

```bash
# Create website directory
sudo mkdir -p /var/www/website
cd /var/www/website
```

---

## Step 5: Upload and Extract Code

```bash
# Upload the zip file to /var/www/website/ using SFTP or SCP
# Then extract:
cd /var/www/website
unzip etieducom_latest.zip
```

---

## Step 6: Setup Backend

```bash
cd /var/www/website/backend

# Create Python virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Install emergentintegrations (for AI chatbot)
pip install emergentintegrations --extra-index-url https://d33sy5i8bnduwe.cloudfront.net/simple/

# Create .env file
cat > .env << 'EOF'
MONGO_URL=mongodb://localhost:27017
DB_NAME=etieducom
ADMIN_PASSWORD=your_secure_password_here
EMERGENT_API_KEY=your_emergent_key_here
EOF

# Test backend manually first
python -m uvicorn server:app --host 127.0.0.1 --port 8001
# Press Ctrl+C to stop after confirming it works
```

---

## Step 7: Setup Frontend

```bash
cd /var/www/website/frontend

# Install dependencies
npm install

# Create .env file
cat > .env << 'EOF'
REACT_APP_BACKEND_URL=https://etieducom.com
EOF

# Build frontend for production
npm run build
```

---

## Step 8: Configure PM2 for Backend

```bash
cd /var/www/website/backend

# Create PM2 ecosystem file
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'eti-backend',
    script: 'venv/bin/python',
    args: '-m uvicorn server:app --host 127.0.0.1 --port 8001',
    cwd: '/var/www/website/backend',
    env: {
      MONGO_URL: 'mongodb://localhost:27017',
      DB_NAME: 'etieducom'
    },
    interpreter: 'none',
    autorestart: true,
    watch: false,
    max_memory_restart: '500M'
  }]
};
EOF

# Start backend with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## Step 9: Configure Nginx

```bash
# Create Nginx config
sudo nano /etc/nginx/sites-available/etieducom

# Paste this configuration:
```

```nginx
server {
    listen 80;
    server_name etieducom.com www.etieducom.com;
    
    # Redirect HTTP to HTTPS (after SSL is setup)
    # return 301 https://$server_name$request_uri;
    
    # Frontend - React build files
    root /var/www/website/frontend/build;
    index index.html;
    
    # API routes - proxy to backend
    location /api/ {
        proxy_pass http://127.0.0.1:8001/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }
    
    # Frontend routes - serve React app
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Static files caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

```bash
# Enable the site
sudo ln -sf /etc/nginx/sites-available/etieducom /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

---

## Step 10: Setup SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d etieducom.com -d www.etieducom.com

# Auto-renewal is automatically configured
```

---

## Step 11: Verify Everything Works

```bash
# Check PM2 status
pm2 status

# Check backend logs
pm2 logs eti-backend --lines 50

# Check Nginx status
sudo systemctl status nginx

# Check MongoDB status
sudo systemctl status mongod

# Test API
curl http://localhost:8001/api/health
```

---

## Useful Commands

### Restart Services
```bash
# Restart backend
pm2 restart eti-backend

# Restart Nginx
sudo systemctl restart nginx

# Restart MongoDB
sudo systemctl restart mongod
```

### View Logs
```bash
# Backend logs
pm2 logs eti-backend

# Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Nginx access logs
sudo tail -f /var/log/nginx/access.log
```

### Update Code
```bash
cd /var/www/website

# Backup current code
cp -r backend backend_backup
cp -r frontend frontend_backup

# Upload and extract new code
unzip -o etieducom_latest.zip

# Rebuild frontend
cd frontend && npm install && npm run build

# Restart backend
cd ../backend
source venv/bin/activate
pip install -r requirements.txt
pm2 restart eti-backend
```

---

## Troubleshooting

### Backend not starting
```bash
# Check if port 8001 is in use
sudo lsof -i :8001

# Check Python dependencies
cd /var/www/website/backend
source venv/bin/activate
pip install -r requirements.txt
pip install emergentintegrations --extra-index-url https://d33sy5i8bnduwe.cloudfront.net/simple/

# Run manually to see errors
python -m uvicorn server:app --host 127.0.0.1 --port 8001
```

### MongoDB connection issues
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Start MongoDB
sudo systemctl start mongod

# Check MongoDB logs
sudo cat /var/log/mongodb/mongod.log | tail -50
```

### Nginx showing wrong site
```bash
# List enabled sites
ls -la /etc/nginx/sites-enabled/

# Remove other sites (careful!)
sudo rm /etc/nginx/sites-enabled/default
sudo rm /etc/nginx/sites-enabled/bms  # if exists

# Keep only etieducom
sudo nginx -t
sudo systemctl restart nginx
```

### Data not persisting
```bash
# Make sure PM2 is using the correct .env
pm2 restart eti-backend --update-env

# Or use ecosystem.config.js with env variables
pm2 delete eti-backend
pm2 start ecosystem.config.js
```

---

## Admin Panel Access

- **URL:** https://etieducom.com/admin
- **Password:** Set in `/var/www/website/backend/.env` as `ADMIN_PASSWORD`

---

## Support

If you face any issues, please share:
1. Output of `pm2 logs eti-backend --lines 100`
2. Output of `sudo nginx -t`
3. Output of `curl http://localhost:8001/api/health`
