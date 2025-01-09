import { Link } from 'react-router-dom';
import { MdSportsEsports } from 'react-icons/md';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useAuthContext } from '../../hooks/useAuthContext.jsx';
import '../../styles/TuilesSingleCard.css';

const TuilesSingleCard = ({ tuile }) => {
    const { user } = useAuthContext()
    return (
        <div key={tuile._id} className='tuile-card'>
            <div className='tuile-category'>
                <h2 className='my-1'>{tuile.categorie}</h2>
            </div>
            <div className='tuile-header'>
            <MdSportsEsports className='tuile-icon' />
                <h2 className='my-1'>{tuile.titre}</h2>
            </div>
            <div className='tuile-header'>
                <BiUserCircle className='tuile-icon' />
                <h2 className='my-1'>{tuile.auteur}</h2>
            </div>
            <div className='tuile-actions'>
                <Link to={`/tuiles/details/${tuile._id}`}>
                    <BsInfoCircle className='info-icon' />
                </Link>
                {user && (user.username === tuile.auteur || user.role === 'admin') && (
                    <>
                        <Link to={`/tuiles/edit/${tuile._id}`}>
                            <AiOutlineEdit className='edit-icon' />
                        </Link>
                        <Link to={`/tuiles/delete/${tuile._id}`}>
                            <MdOutlineDelete className='delete-icon' />
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default TuilesSingleCard