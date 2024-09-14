import { useContext } from "react"
import { StoreContext } from "../../Context/StoreContext"
import FoodCard from "../FoodCard/FoodCard"
import './FoodDisplay.css'



function FoodDisplay({catagory}) {
  const {food_list} = useContext(StoreContext)
  return (
    <div className="foodList" id="foodList">
        <h1>Top dishes near you</h1>
        <div className="Container">
          {

            
            food_list.map(({_id,name,image,price,category,description},i)=>{

              if (catagory === 'All' || catagory === category) {
                return (
                  <FoodCard
                    key={i}
                    id={_id}
                    name={name}
                    image={image}
                    price={price}
                    category={category}
                    description={description}
                  />
                );
              }

          
            })
          }

        </div>
    </div>

    

  )
}

export default FoodDisplay