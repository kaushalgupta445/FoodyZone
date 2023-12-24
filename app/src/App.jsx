import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "./components/SearchResults/SearchResult";

export const BASE_URL = "http://localhost:9000";

const App = () => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);

      try {
        const response = await fetch(BASE_URL);

        const json = await response.json();

        setData(json);
        setFilteredData(json);
        setLoading(false);
      } catch (error) {
        setError("Unable to fetch data");
      }
    };
    fetchFoodData();
  }, []);

  const searchFood = (e) => {
    const searchValue = e.target.value;

    console.log(searchValue);

    if (searchValue === "") {
      setFilteredData(null);
    }

    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filter);
  };

  const filterFood = (type) => {
    if (type === "all") {
      setFilteredData(data);
      setSelectedBtn("all");
      return;
    }

    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter);
    setSelectedBtn(type);
  };

  const filterBtns = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];

  if (error) return <div>{error}</div>;
  if (loading) return <div>loading.....</div>;

  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="/logo.svg" alt="logo" />
          </div>

          <div className="search">
            <input onChange={searchFood} placeholder="Search Food" />
          </div>
        </TopContainer>

        <FilterContainer>
          {filterBtns.map((value) => (
            <Button
              isSelected={selectedBtn === value.type}
              key={value.name}
              onClick={() => filterFood(value.type)}
            >
              {value.name}
            </Button>
          ))}
        </FilterContainer>
      </Container>
      <SearchResult data={filteredData} />
    </>
  );
};

export default App;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const TopContainer = styled.section`
  height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
      &::placeholder {
        color: white;
      }
    }
  }

  @media (0 < width < 600px) {
    flex-direction: column;
    height: 120px;
  }
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 40px;
`;

export const Button = styled.button`
  background: ${({ isSelected }) => (isSelected ? "#f22f2f" : "#ff4343")};
  outline: 1px solid ${({ isSelected }) => (isSelected ? "white" : "#ff4343")};
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #f22f2f;
  }
`;
// import { useState, useEffect} from "react";
// import SearchResult from "./components/SearchResults/SearchResult";
// import styled from "styled-components";

// export const BASE_URL= 'http://localhost:9000';

// const App=()=>{
//   const[data, setData]= useState(null);
//   const[loading, setLoading]= useState(false);
//   const[error, setError]= useState(null);



// useEffect(() => {
  
//   const fetchFoodData = async () => {
//     setLoading(true);
    
//     try{
//       const response= await fetch(BASE_URL);
  
//       const json = await response.json();
      
//       setData(json);
//       setLoading(false);
//     } catch(error){
//       setError('Unable to Load');
//     }
  
//   };
  
//   fetchFoodData();
// },[]);

// console.log(data);

// // const temp = [
// //   {
// //     "name": "Boilded Egg",
// //     "price": 10,
// //     "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
// //     "image": "/images/egg.png",
// //     "type": "breakfast"
// //     },
// //     {
// //     "name": "RAMEN",
// //     "price": 25,
// //     "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
// //     "image": "/images/ramen.png",
// //     "type": "lunch"
// //     },
// //     {
// //     "name": "GRILLED CHICKEN",
// //     "price": 45,
// //     "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
// //     "image": "/images/chicken.png",
// //     "type": "dinner"
// //     },
// //     {
// //     "name": "CAKE",
// //     "price": 18,
// //     "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
// //     "image": "/images/cake.png",
// //     "type": "breakfast"
// //     },
// //     {
// //     "name": "BURGER",
// //     "price": 23,
// //     "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
// //     "image": "/images/burger.png",
// //     "type": "lunch"
// //     },
// //     {
// //     "name": "PANCAKE",
// //     "price": 25,
// //     "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
// //     "image": "/images/pancake.png",
// //     "type": "dinner"
// //     },
// //   ];


// if(error) return <div>Error</div>
// if(loading) return <div>Loading...</div>
//   return(
//     <Container>
//       <TopSection>
//         <div className='Logo'>
//           <img src='/logo.svg' alt='image'/>
//           </div>
//           <div className="search">
//             <input 
//             placeholder='Search Food'>

//             </input>
//           </div>
//       </TopSection>

//   <FilterContainer>
//     <Button>All</Button>
//     <Button>Breakfast</Button>
//     <Button>Lunch</Button>
//     <Button>Dinner</Button>
//   </FilterContainer>   

//   {/* <FoodContainer>

//   </FoodContainer> 
//   <FoodCards>

//   </FoodCards> */}
//   <SearchResult data={data} />
//     </Container>
//   )
// };

// export default App;

// const Container=styled.div `
// max-width:1200px;
// margin:0 auto;

// `;
// const TopSection=styled.section`
// min-height:140px;
// display: flex;
// justify-content: space-between;
// padding: 16px;
// align-items: center;

//  .search{
//   input{
//     background-color: transparent;
//     border: 2px solid red;
//     color: white;
//     border-radius: 5px;
//     height: 40px;
//     font-size: 16px;
//     padding: 0 10px;


//   }
//  }
// `;
// const FilterContainer=styled.section`
//  display: flex;
//  justify-content: center;
//  gap: 10px;
//  padding-bottom: 40px;

// `;

// export const Button=styled.button`
//  background: #ff4343;
//  border-radius: 5px;
//  padding: 6px 12px;
//  border: none;
//  color: white;
// `;

// const FoodContainer=styled.section`
// height: calc(100vh - 210px);
// background-image: url('/bg.png');
// background-size: cover;
// `;
// const FoodCards=styled.div``;


