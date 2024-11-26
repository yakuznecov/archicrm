import { Tooltip } from 'antd';

const CommonTooltip = ({ title, children }) => {
	return <Tooltip title={title}>{children}</Tooltip>;
};

export default CommonTooltip;
