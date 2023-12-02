     
    const express = require('express');
    const crypto = require('crypto');
    const axios = require('axios');
    
    const app = express();
    
    // Spotify app credentials
    const CLIENT_ID = 'bca145cd351d4a3ba3f614d2506513e7';
    const CLIENT_SECRET = 'YOUR_CLd92c6b5dd72d4bf3883acee8f1b766c5IENT_SECRET';
    const REDIRECT_URI = 'http://localhost:8080';
    const SCOPE = 'user-read-private user-read-email';
    
    // Generate a random code verifier
    const codeVerifier = base64URLEncode(crypto.randomBytes(32));
    
    // Helper function to base64 URL-encode a string
    function base64URLEncode(str) {
      return str.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    }
    
    // Generate code challenge from code verifier
    const codeChallenge = base64URLEncode(crypto.createHash('sha256').update(codeVerifier).digest());
    
    app.get('/', (req, res) => {
      // Redirect user to Spotify authorization endpoint
      const authorizationUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&code_challenge_method=S256&code_challenge=${codeChallenge}&scope=${SCOPE}&state=random_state`;
      res.redirect(authorizationUrl);
    });
    
    app.get('/callback', async (req, res) => {
      const { code } = req.query;
    
      // Exchange authorization code for access token
      const tokenUrl = 'https://accounts.spotify.com/api/token';
      const data = {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
        code_verifier: codeVerifier,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
      };
    
      try {
        const response = await axios.post(tokenUrl, null, { params: data });
        const { access_token } = response.data;
        
        // Store the access token securely and use it for API requests
        console.log('Access Token:', access_token);
    
        res.send('Authorization successful!');
      } catch (error) {
        console.error('Error exchanging authorization code for access token:', error.message);
        res.status(500).send('An error occurred.');
      }
    });
    
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
