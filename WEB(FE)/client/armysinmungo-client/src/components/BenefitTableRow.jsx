import React, { useState, useEffect } from 'react';

const BenefitTableRow = (props) => {
	
	const [modalSwitch, setModalSwitch] = useState('true');
	
	const {
		index,
		location,
		name,
		type,
		end,
		tel,
		site,
		detail, 
		start,
		id
	} = props;
	
	const modalId = '_' + Math.random().toString(36).substr(2, 9);
	const locationId = props.id;
	const mapUrl = `https://map.kakao.com/link/map/${locationId}`;
	const directionUrl = `https://map.kakao.com/link/to/${locationId}`;
	const roadviewUrl = `https://map.kakao.com/link/roadview/${locationId}`;
	const detailUrl = `https://place.map.kakao.com/${locationId}`;
	
	const modalOnHandler = (e) => {
		e.preventDefault();
		setModalSwitch('false');
	}
	
	const modalOffHandler = (e) => {
		e.preventDefault();
		setModalSwitch('true');
	}
	
	useEffect(()=> {
		
	}, []);
	
	useEffect(() => {
	}, [modalSwitch])
	
	return (

			<tr key={name}>
			  <th scope="row">{index+1}</th>
			  <td>
				<button onClick={modalOnHandler} type="button" data-toggle="modal" data-target={'#' + modalId} className="btn btn-link" style={{textDecoration: 'none', padding: '0', fontSize: '16px'}}>
				  {name}
				</button>
					<div className="modal fade" id={modalId} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
					  <div className="modal-dialog" role="document">
						<div className="modal-content">
						  <div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel" style={{fontSize: '20px', width: '80%', fontWeight:'500', 'color': 'black'}}>{name}</h5>
							 {/* 
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
							  <span aria-hidden="true">&times;</span>
							</button>
						  	*/}
						  </div>
						  <div className="modal-body">
							  { id !== null &&
							   <div style={{
									  width: '100%',
									  height: '400px',
									  border: '15px solid rgb(255, 218, 126)',
									  borderRadius: '40px',
								  }}>
							    <a href={mapUrl} target="_blank" style={{ color: 'white', fontSize: '25px',}}>
									<div style={{
											  float: 'left',
											  width: '50%',
											  height: '50%',
											  backgroundColor: 'rgb(104, 111, 18)',
											  padding: '3%',
											  backgroundClip: 'content-box',
											  borderRadius: '50px',
											  display: 'flex',
											  justifyContent: 'center',
											  alignItems: 'center',
										  }}>
										지도보기
									</div>
								</a>
								<a href={detailUrl} target="_blank" style={{ color: 'white', fontSize: '25px',}}>
									<div style={{
											  float: 'left',
											  width: '50%',
											  height: '50%',
											  backgroundColor: 'rgb(151, 98, 65)',
											  padding: '3%',
											  backgroundClip: 'content-box',
											  borderRadius: '50px',
											  display: 'flex',
											  justifyContent: 'center',
											  alignItems: 'center',
										  }}>
										상세정보
									</div>
								</a>
							    <a href={directionUrl} target="_blank" style={{ color: 'white', fontSize: '25px',}}>
									<div style={{
											  float: 'left',
											  width: '50%',
											  height: '50%',
											  backgroundColor: 'rgb(199, 202, 156)',
											  padding: '3%',
											  backgroundClip: 'content-box',
											  borderRadius: '50px',
											  display: 'flex',
											  justifyContent: 'center',
											  alignItems: 'center',
										  }}>
										길찾기
									</div>
								</a>
							    <a href={roadviewUrl} target="_blank" style={{ color: 'white', fontSize: '25px',}}>
									<div style={{
											  float: 'left',
											  width: '50%',
											  height: '50%',
											  backgroundColor: 'rgb(255, 218, 126)',
											  padding: '3%',
											  backgroundClip: 'content-box',
											  borderRadius: '50px',
											  display: 'flex',
											  justifyContent: 'center',
											  alignItems: 'center',
										  }}>
										로드뷰
									</div>
							    </a>
							  </div>
							  }
							<div style={{ padding: '12px 8px' }}>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
								  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
								</svg> <span style={{fontSize: '20px'}}>{location}</span>
							</div>
							<div style={{ padding: '12px 8px' }}>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-question-circle" viewBox="0 0 16 16">
								  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
								  <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
								</svg> <span style={{fontSize: '20px'}}>{type} { detail && `/ ${detail}`}</span>
							</div>
							<div style={{ padding: '12px 8px' }}>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar-check" viewBox="0 0 16 16">
								  <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
								  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
								</svg> <span style={{fontSize: '20px'}}>{`${start} ~ ${end}`}</span>
							</div>
							<div style={{ padding: '12px 8px' }}>
							  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone" viewBox="0 0 16 16">
							  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
							</svg> <span style={{fontSize: '20px'}}>{tel}</span>
							</div>
							{/*  
							<div style={{ padding: '12px 8px' }}>
							  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-globe" viewBox="0 0 16 16">
							  <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/>
							</svg> <span style={{fontSize: '20px'}}><a href={site}>{site}</a></span>
							</div>
							*/}
						  </div>
						  <div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-dismiss="modal"
								style={{backgroundColor: 'rgb(255, 218, 126)', color:'rgb(104, 111, 18)'}}>닫기</button>
						  </div>
						</div>
					  </div>
					</div>

			  </td>
			  <td>{type}</td>
			  <td>{end}</td>
			</tr>
			
			

	);
};

export default BenefitTableRow;