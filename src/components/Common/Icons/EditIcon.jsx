import React from 'react';
import editIcon from '@/assets/images/edit/edit.svg';

const EditIcon = ({ id }) => {
	return <img src={editIcon} alt='editIcon' id={id} width={20} height={20} />;
};

export default EditIcon;
