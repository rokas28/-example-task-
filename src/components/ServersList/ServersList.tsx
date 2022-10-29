import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useAppSelector, useAppDispatch } from '../../hooks/useReduxHooks';
import Status from '../../enums/statusEnum';
import Server from '../../types/Server';
import { getServers } from '../../state/Slices/serversSlice';
import Header from '../Header/Header';
import SingleServer from '../SingleServer/SingleServer';
import './ServersList.scss';

interface Pagination {
	data: Server[];
	offset: number;
	numberPerPage: number;
	pageCount: number;
	currentData: Server[];
}

const ServersList: React.FC = () => {
	const dispatch = useAppDispatch();
	const servers = useAppSelector((state) => state.servers.servers);
	const status = useAppSelector((state) => state.servers.status);

	const [pagination, setPagination] = useState<Pagination>({
		data: servers,
		offset: 0,
		numberPerPage: 10,
		pageCount: 0,
		currentData: [],
	});

	useEffect(() => {
		dispatch(getServers());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setPagination((prevState) => ({
			...prevState,
			data: servers,
			pageCount: Math.ceil(servers.length / prevState.numberPerPage),
			currentData: servers.slice(prevState.offset, prevState.offset + prevState.numberPerPage),
		}));
	}, [servers]);

	const handlePageClick = ({ selected }: { selected: number }) => {
		const { numberPerPage } = pagination;
		const offset = selected * numberPerPage;
		setPagination((prevState) => ({
			...prevState,
			offset,
			currentData: prevState.data.slice(offset, offset + numberPerPage),
		}));
	};

	return (
		<>
			<Header />
			<div className='servers-list-container' data-testid='servers-list-container'>
				<div className='list-heading'>
					<div>Name</div>
					<div>Distance</div>
				</div>
				{status === Status.LOADING && <div className='loading-container'>Loading...</div>}
				{pagination.currentData &&
					pagination.currentData.map((server, index) => (
						<SingleServer key={index} server={server} />
					))}
				<ReactPaginate
					previousLabel={'previous'}
					nextLabel={'next'}
					breakLabel={'...'}
					pageCount={pagination.pageCount}
					marginPagesDisplayed={1}
					pageRangeDisplayed={2}
					onPageChange={handlePageClick}
					containerClassName={'pagination-container'}
					activeClassName={'active'}
				/>
			</div>
		</>
	);
};

export default ServersList;
