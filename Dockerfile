FROM node:12.18.1
WORKDIR ./qr_menu_backend/WIX3004_QR_Menu_App_Backend/WIX3004_QR_Menu_App_Backend
RUN ls
RUN npm install
ENV NODE_ENV=production
RUN npm start