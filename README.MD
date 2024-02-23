Add typescript for use.
Using https://blog.logrocket.com/how-to-set-up-node-typescript-express/ this url.

import morgan from 'morgan'
app.use(morgan('tiny')) 
bular har bir log (routni) konsolda ko'rsatadi

app.use(express.json()) - yuborayotgan so'rovni json formatida o'qiydi
app.use(express.urlencoded()) so'rovni key=value qiymatida o'qiydi

app.use(express.static('public')) - bunda to'gridan to'g'ri berilgan papka ma'lumotlaridan foydalanish imkonini beradi.

# TypeScriptda mongoose schema yozish qoidasi.

```
// user.ts

import mongoose from 'mongoose';

interface User {
  name: string;
  email: string;
  age: number;
}

const userSchema = new mongoose.Schema<User>({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  age: { type: Number, min: 18 }
});

const User = mongoose.model('User', userSchema);

export default User;

```

# MongoDb da hijjatlar o'rtasida ishlanish

MongoDb da hujjatlar uch xil usulda aloqa modellashtiriladi.
1. Ko'rsatkichli (normalization) - Consistensy - muvofiqlik beradi. Ya'ni keyinchalik muallif o'zgartirilsa ma'lumotni faqat bir qismi o'zgaradi. Ammo bunda book ga so'rov berilsa unga qo'shimcha author so'rovini ham qilish kerak.
let author = {
  _id: 123, 
  firstName: "", 
  lastName: "", 
}
let book ={
  _id: 456, 
  titile: "Javascript asoslari", 
  author: 123, 
}
* Bunda authorni 123 qiymati authorga ko'rsatkich bo'ladi
2. Biriktirish (denormalization) - perfomance - tezligini beradi. Buni kamchiligi authorni har birini ichidan o'zgartirib beradi.

let book1={
  _id:123, 
  title: "Nodejs Asoslari", 
  author:{

    _id: 123,

  firstName: "", 
  lastName: "", 
  }
}
3. 1 va 2 ussular chatishmasi (hybrid approach) - Bunda yuqoridagi 2 usulni chatishtirib unda 2 usul kabi author obyektini hamma xossalarini emas balki eng ko'p ishlatiladigan xossalarini saqlaymiz.
let book2 = {
  _id:123, 
  title: "Nodejs Asoslari", 
  author:{

    _id: 123,
    firstName: "Farhod"

  }
}
