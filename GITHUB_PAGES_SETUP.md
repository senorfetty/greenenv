# GitHub Pages Setup for greenenvironment.co.ke

## Step-by-Step GitHub Pages Configuration

### 1. Repository Setup
1. **Create a new repository** on GitHub (or use existing one)
2. **Upload all your files** to the repository
3. **Make sure the main file is named `index.html`** (you already have this)

### 2. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Choose **main** branch (or **master** if that's your default)
6. Click **Save**

### 3. Configure Custom Domain
1. In the **Pages** settings, scroll to **Custom domain**
2. Enter: `greenenvironment.co.ke`
3. Check **Enforce HTTPS** (this will be available after DNS is configured)
4. Click **Save**

### 4. DNS Configuration
Configure these DNS records with your domain registrar:

#### A Records (Add all 4):
```
Type: A, Name: @, Value: 185.199.108.153
Type: A, Name: @, Value: 185.199.109.153  
Type: A, Name: @, Value: 185.199.110.153
Type: A, Name: @, Value: 185.199.111.153
```

#### CNAME Record:
```
Type: CNAME, Name: www, Value: [yourusername].github.io
```

### 5. Wait for DNS Propagation
- DNS changes can take 24-48 hours to propagate
- You can check status at: https://dnschecker.org

### 6. Verify Setup
1. Visit `https://greenenvironment.co.ke`
2. Visit `https://www.greenenvironment.co.ke` (should redirect)
3. Check that HTTPS is working

## Important Files Created

- ✅ `CNAME` - Tells GitHub Pages your custom domain
- ✅ `_config.yml` - Jekyll configuration for SEO
- ✅ Updated `index.html` with proper meta tags

## Troubleshooting

### If domain doesn't work:
1. Check DNS propagation: https://dnschecker.org
2. Verify CNAME file is in root directory
3. Wait up to 24 hours for changes to take effect

### If HTTPS doesn't work:
1. Wait for DNS to fully propagate
2. Go to Pages settings and enable "Enforce HTTPS"
3. This may take a few hours after DNS is working

## Your Website URL
Once configured: **https://greenenvironment.co.ke**

## Support
- GitHub Pages Documentation: https://docs.github.com/en/pages
- Domain troubleshooting: Check your domain registrar's DNS settings
