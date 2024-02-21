Add typescript for use.
Using https://blog.logrocket.com/how-to-set-up-node-typescript-express/ this url.

import morgan from 'morgan'
app.use(morgan('tiny')) 
bular har bir log (routni) konsolda ko'rsatadi

app.use(express.json()) - yuborayotgan so'rovni json formatida o'qiydi
app.use(express.urlencoded()) so'rovni key=value qiymatida o'qiydi

app.use(express.static('public')) - bunda to'gridan to'g'ri berilgan papka ma'lumotlaridan foydalanish imkonini beradi.

