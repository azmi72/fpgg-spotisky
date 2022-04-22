
import { Image } from "@chakra-ui/react"
import './styles.css';

export interface ICard {
  id: number,
  title: string,
  owner: string,
  thumbnail: string,
  onClick?: () => void
}

const Card = ({title, owner,  thumbnail, onClick} : ICard) => {
  return (
    <div className="card" onClick={onClick}>
      <div className="card-thumbnail"  data-testid="card-thumbnail">
        <Image src={thumbnail} alt={title} boxSize='180px' objectFit='cover' objectPosition='top' width='100%' />
      </div>
      <div className="card-content">
        <div className="card-wrapper">
          <h3 className="card-title">{title}</h3>
          <span className="card-owner">{owner}</span>
        </div>
      </div>
    </div>
  )
}

export default Card