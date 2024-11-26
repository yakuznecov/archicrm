import { Tag } from 'antd';

const CommonTag = ({ color, text }) => {
	return <Tag color={color}>{text}</Tag>;
};

export default CommonTag;
