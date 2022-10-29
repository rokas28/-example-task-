import React from 'react';
import Server from '../../types/Server';
import './SingleServer.scss';

interface SingleServerProps {
	server: Server;
}

const SingleServer: React.FC<SingleServerProps> = ({ server }) => {
	const { name, distance } = server;
	return (
		<div className='single-server-container'>
			<div className='server-content' data-testid='server-content'>
				<div>{name}</div>
				<div>{distance}</div>
			</div>
		</div>
	);
};

export default SingleServer;
