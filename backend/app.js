import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import routes from './routes/index.js';

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credential: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json()); // JSON 형식의 요청 처리
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', routes);

// Server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
