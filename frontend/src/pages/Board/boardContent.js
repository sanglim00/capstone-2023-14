import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header/header';
import { Comment, DetailInfo, Textarea, Wrap, WriterInfo } from './styles';
import { Small, SubTitle } from '../../components/Fonts/fonts';
import axios from 'axios';

function BoardContent() {
  const props = useLocation();
  const [post, setPost] = useState({});
  const [feedComments, setFeedComments] = useState([]);

  const [chat, setChat] = useState({
    board_id: -1,
    email: 'user',
    content: '',
  });

  useEffect(() => {
    setPost({ ...props.state });
    setChat((chat) => ({ ...chat, board_id: props.state.board_id }));
  }, [props.state]);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await axios.post(
          'http://localhost:5001/api/get-replyList',
          {
            board_id: props.state.board_id,
          },
        );
        setFeedComments(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchComment();
  }, [props.state.board_id]);

  const SendChatText = async () => {
    if (chat.content === '') return;

    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const chatToBeSent = {
      ...chat,
      upload_time: now,
      update_time: now,
    };

    try {
      await axios.post('http://localhost:5001/api/reply-write', chatToBeSent);
      setChat((chat) => ({ ...chat, content: '' }));
      // 댓글 보내고 새로 댓글 목록 가져오기
      const response = await axios.post(
        'http://localhost:5001/api/get-replyList',
        {
          board_id: props.state.board_id,
        },
      );
      setFeedComments(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const HandleKeyDown = (e) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter' && e.shiftKey) return;
    if (e.key === 'Enter' && !e.shiftKey) {
      SendChatText();
      e.preventDefault();
    }
  };

  const handleOnChange = (e) => {
    setChat((chat) => ({ ...chat, content: e.target.value }));
  };

  return (
    <div>
      <Header title={'board-content'} />
      <Wrap>
        <WriterInfo>
          <img src={''} alt="" />
          <div>
            <SubTitle margin={'0 0 2px'}>{post.writer}</SubTitle>
            <DetailInfo>
              <Small color={'#7c7c7c'}>{post.age}세</Small>
              <Small color={'#7c7c7c'}>{post.gender}</Small>
              <Small color={'#EF4E3E'}>{post.mbti}</Small>
            </DetailInfo>
          </div>
        </WriterInfo>
        <Textarea value={post.content} disabled />
        <div>
          {feedComments.map((comment) => (
            <div key={comment.reply_id}>
              <span>{comment.replyer}: </span>
              <span>{comment.content}</span>
            </div>
          ))}
        </div>
      </Wrap>
      <Comment>
        <div>
          <input
            type="text"
            placeholder="댓글을 남겨보세요."
            onChange={handleOnChange}
            onKeyDown={HandleKeyDown}
            name={'comment'}
            value={chat.content}
          />
          <button onClick={SendChatText}>전송</button>
        </div>
      </Comment>
    </div>
  );
}

export default BoardContent;
