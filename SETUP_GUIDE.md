# 🚀 Quick Setup Guide - Globe Trekker

This guide walks you through setting up and launching your Globe Trekker website step by step.

## 📝 Setup Steps

### Step 1: Install Dependencies

✅ **Already done!** Dependencies have been installed.

If you need to reinstall:
```bash
npm install
```

### Step 2: Configure Supabase

1. **Create a Supabase account**
   - Go to [supabase.com](https://supabase.com)
   - Create a free account

2. **Create a new project**
   - Click on "New Project"
   - Choose a name and database password
   - Select your region
   - Wait for the project to be created (1-2 minutes)

3. **Get your API keys**
   - Go to **Settings** > **API** in your Supabase project
   - Copy the following:
     - **Project URL** → This is your `NEXT_PUBLIC_SUPABASE_URL`
     - **anon public** key → This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. **Create the database tables**
   - Go to **SQL Editor** in your Supabase project
   - Click on "New Query"
   - Open the file `supabase/seed.sql` from your project folder
   - Copy the entire contents of that file
   - Paste it into the SQL Editor
   - Click "Run" or press Ctrl+Enter to execute the script
   - ✅ **Verify** that these tables were created:
     - `countries`
     - `destinations`
     - `posts`
     - `contact_messages`
   - You can check in **Table Editor** to see the tables

### Step 3: Configure Cloudinary

1. **Create a Cloudinary account**
   - Go to [cloudinary.com](https://cloudinary.com)
   - Create a free account

2. **Get your Cloud Name**
   - In the **Dashboard**, find your **Cloud name** (it's displayed at the top)
   - This is your `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`

3. **(Optional) Upload test images**
   - You can upload test images in Cloudinary Media Library
   - Update the image URLs in Supabase database later to use your images

### Step 4: Configure Google OAuth (Optional but Recommended)

⚠️ **This step is only needed if you want to use Google login.**

1. **Create a Google Cloud project**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select an existing one

2. **Configure OAuth Consent Screen**
   - Go to **APIs & Services** > **OAuth consent screen**
   - Fill in the basic information
   - Choose "External" (for personal/test use)

3. **Create OAuth credentials**
   - Go to **APIs & Services** > **Credentials**
   - Click **Create Credentials** > **OAuth client ID**
   - Choose **Web application**
   - Add these **Authorized redirect URIs**:
     - `http://localhost:3000/auth/callback` (for local development)
     - `https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback` (replace YOUR_PROJECT_ID with your Supabase project ID - found in Settings > General > Reference ID)

4. **Copy Client ID and Client Secret**
   - Copy your **Client ID** and **Client Secret** immediately (you won't be able to see the secret again)

5. **Configure in Supabase**
   - In Supabase, go to **Authentication** > **Providers**
   - Enable **Google** (toggle it on)
   - Paste your **Client ID** and **Client Secret**
   - Click **Save**

### Step 5: Create the .env.local file

Create a file named `.env.local` in the root of your project with this content:

```env
# Supabase Configuration (replace with your values from Step 2)
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key-here"

# Cloudinary Configuration (replace with your values from Step 3)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"

# Site URL (optional, for OAuth callbacks)
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

**Important Notes:**
- Replace the placeholder values with your actual values from Supabase and Cloudinary
- Keep the quotes around the values
- Don't commit this file to Git (it's already in .gitignore)

### Step 6: Launch the Project

Once you've completed steps 2-5:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## ✅ Verification Checklist

Before launching, make sure:

- [ ] Dependencies installed (✅ Done)
- [ ] Supabase account created
- [ ] Supabase project created
- [ ] Database tables created (ran `supabase/seed.sql`)
- [ ] API keys copied from Supabase
- [ ] Cloudinary account created
- [ ] Cloudinary cloud name copied
- [ ] `.env.local` file created with all values filled in
- [ ] Google OAuth configured (optional)

## 🔍 Testing the Setup

### Test the Homepage
1. Go to `http://localhost:3000`
2. Check that the homepage displays
3. Check that destinations are shown (if you have data in Supabase)

### Test the Blog
1. Go to `http://localhost:3000/blog`
2. Check that blog posts are displayed

### Test the Contact Form
1. Go to `http://localhost:3000/contact`
2. Fill out and submit the form
3. Check in Supabase **Table Editor** > `contact_messages` that your message was saved

### Test Authentication (if configured)
1. Go to `http://localhost:3000/login`
2. Click "Sign in with Google"
3. Sign in with your Google account
4. Verify you're redirected to `/dashboard`

## 🐛 Common Problems & Solutions

### "Supabase environment variables missing"
- **Solution**: Check that your `.env.local` file exists and contains `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` with actual values

### "Error loading destinations"
- **Solution**: 
  - Check that the tables exist in Supabase (Table Editor)
  - Verify you ran the `supabase/seed.sql` script
  - Check that the tables contain data

### "OAuth callback failed"
- **Solution**: 
  - Verify redirect URIs are correctly configured in Google Cloud Console
  - Make sure you added both localhost and Supabase callback URLs
  - Check that Google OAuth is enabled in Supabase

### Images not displaying
- **Solution**: 
  - Verify `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is set in `.env.local`
  - Check that image URLs in the database are valid Cloudinary URLs

### Tables not created
- **Solution**: 
  - Make sure you copied the entire `supabase/seed.sql` file
  - Check for SQL errors in the Supabase SQL Editor
  - Verify you have the correct permissions in Supabase

## 📚 Next Steps

Once everything is working:

1. **Customize content**: Modify texts, colors, and images to match your brand
2. **Add your destinations**: Add your own destinations in Supabase Table Editor
3. **Create blog posts**: Add your own blog posts in the `posts` table
4. **Configure deployment**: Follow the deployment guide in README.md

## 🆘 Need Help?

- Check the main [README.md](README.md) for detailed documentation
- Review the [VIDEO_WALKTHROUGH.md](VIDEO_WALKTHROUGH.md) for step-by-step video script
- Check Supabase documentation: https://supabase.com/docs
