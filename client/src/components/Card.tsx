interface CardProps {
    name: string;
    city: string;
    country: string;
    favorite_sport: string;
  }

function Card({name, city, country, favorite_sport}: CardProps) {
    let emoji = '';

    switch (favorite_sport) {
        case 'Football':
          emoji = '⚽'; 
          break;
        case 'Basketball':
          emoji = '🏀'; 
          break;
        case 'Swimming':
            emoji = '🏊🏽';
            break;
        case 'Tennis':
            emoji = '🎾';
            break;
        default:
          emoji = '🏃🏽‍♀️'; 
          break;
    }

    return (
        <div className="border-2 rounded-lg w-[75%] md:w-[35%] m-8 flex flex-wrap items-center overflow-hidden shadow-l">
            <div className="flex flex-col gap-2 p-6">
                <h2 className="text-xl xl:text-3xl">{name}</h2>
                <h3 className="text-l xl:text-2xl">{city}, {country}</h3>
            </div>
            <div className="ml-auto pl-2 h-full w-[35%] lg:w-[50%] flex items-center bg-slate-300 justify-center">
                <h1 className='text-base xl:text-3xl'>{`${favorite_sport} ${emoji}`}</h1>
            </div>
        </div>
  )
}

export default Card