import db from '../config/db.js';

const saveBoard = (req, res) => {
  const { name, content, upload_time, update_time } = req.body;
  const query = `INSERT INTO board (writer, content, upload_time, update_time) VALUES (?,?,?,?)`;
  const values = [name, content, upload_time, update_time];

  db.query(query, values, (error, result) => {
    if (error) throw error;
    res.status(201).json({ success: true });
  });
};

const getBoardList = (req, res) => {
  const query = `SELECT b.*, m.gender, m.birth, m.mbti FROM board as b, member as m where b.writer=m.name;`;

  db.query(query, (error, result) => {
    if (error) throw error;
    res.send(result);
  });
};

const saveReply = (req, res) => {
  const { board_id, email, content, upload_time, update_time } = req.body;
  const query = `INSERT INTO reply (board_id, replyer, content, upload_time, update_time) VALUES (?, ?, ?, ?, ? )`;
  const values = [board_id, email, content, upload_time, update_time];

  db.query(query, values, (error, result) => {
    if (error) throw error;
    res.status(201).json({ success: true });
  });
};

const getReplyList = (req, res) => {
  const { board_id } = req.body;

  const query = `SELECT * FROM reply WHERE board_id=?;`;
  const values = [board_id];

  db.query(query, values, (error, result) => {
    if (error) throw error;
    res.send(result);
  });
};

const getUserInfo = (req, res) => {
  const { email } = req.body;

  const query = `SELECT name, gender, birth, mbti FROM member WHERE email=?;`;
  const values = [email];

  db.query(query, values, (error, result) => {
    if (error) throw error;
    res.send(result);
  });
};

export default {
  saveBoard,
  getBoardList,
  saveReply,
  getReplyList,
  getUserInfo,
};