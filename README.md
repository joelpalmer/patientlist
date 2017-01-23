1. Clone
2. npm install
3. Update config.json with provided credentials
4. npm run build (requires package called npm-run or you can can just build with tsc if you have typescript 2^ installed)
5. npm run start
6. Browser to localhost:3000

Note: If you stumbled across this repo, you can reference IPatientRecord to model a mongo collection of your own. This code as-is connects to an mLab DB. 
I may at some point change it to a local DB and check it all in. In the meantime, it should be fairly easy to deploy your own DB or change the code to 
fit your data model. Feel free to ping me.