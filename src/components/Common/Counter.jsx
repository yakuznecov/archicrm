import React from 'react';

const Counter = ({ count, onIncrement, onDecrement }) => {
	return (
		<div className="archi__count_wrapper">
			<button onClick={onDecrement} className="archi__count_btn">
				-
			</button>
			<span className="archi__count">{count}</span>
			<button onClick={onIncrement} className="archi__count_btn">
				+
			</button>
		</div>
	);
};

export default Counter;
