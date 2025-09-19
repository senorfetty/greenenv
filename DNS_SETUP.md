# DNS Configuration for greenenvironment.co.ke (GitHub Pages)

## Required DNS Records for GitHub Pages

To properly link your domain `greenenvironment.co.ke` to your GitHub Pages website, you need to configure the following DNS records with your domain registrar:

### 1. A Records (GitHub Pages IPs)
```
Type: A
Name: @ (or leave blank)
Value: 185.199.108.153
TTL: 3600 (1 hour)

Type: A
Name: @ (or leave blank)
Value: 185.199.109.153
TTL: 3600 (1 hour)

Type: A
Name: @ (or leave blank)
Value: 185.199.110.153
TTL: 3600 (1 hour)

Type: A
Name: @ (or leave blank)
Value: 185.199.111.153
TTL: 3600 (1 hour)
```

### 2. CNAME Record for www subdomain
```
Type: CNAME
Name: www
Value: yourusername.github.io
TTL: 3600 (1 hour)
```

## Additional Recommended Records

### 4. TXT Record for Domain Verification
```
Type: TXT
Name: @
Value: v=spf1 include:_spf.google.com ~all
TTL: 3600 (1 hour)
```

### 5. MX Record (if you want email)
```
Type: MX
Name: @
Value: mail.greenenvironment.co.ke
Priority: 10
TTL: 3600 (1 hour)
```

## Steps to Configure:

1. **Log into your domain registrar's control panel**
2. **Navigate to DNS Management or DNS Settings**
3. **Add the A records above with your server's IP address**
4. **Save the changes**
5. **Wait for DNS propagation (can take 24-48 hours)**

## Testing Your Domain:

After setting up DNS, test your domain:
- Visit `https://greenenvironment.co.ke`
- Visit `https://www.greenenvironment.co.ke` (should redirect to non-www)
- Check that HTTPS is working properly

## Server Requirements:

Make sure your web server is configured to:
- Serve files from the directory containing your `index.html`
- Support HTTPS with a valid SSL certificate
- Handle the `.htaccess` file for redirects and security headers

## SSL Certificate:

You'll need an SSL certificate for HTTPS. Options:
- Let's Encrypt (free)
- Your hosting provider's SSL
- Commercial SSL certificate

## Contact Information:

If you need help with server configuration, contact your hosting provider with this information.
