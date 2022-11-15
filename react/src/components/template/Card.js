import './Card.css';

export default function Cards ({nome,ra,codCurso,img}){
    return(      
            
            <div className='card'>
                <div className='imgCarro'>
                   <img src={img}/> 
                </div>
                <div className='nomeCarro'>
                    Mclaren F1 Tributo Senna edição especial 50 anos
                </div>
                <div className='valor'>
                    Valor
                </div>
                <div className='ano'>
                    Ano
                </div>
                <div className='marca'>
                    Marca
                </div>
                <p></p>
            </div>     
      
    )
}