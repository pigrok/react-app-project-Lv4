import React from "react";

function Category({ categoryChangeHandler }) {
  const categoryOptions = [
    "게임",
    "음악",
    "영화",
    "먹방",
    "브이로그",
    "IT",
    "예능",
    "동물",
    "스포츠",
    "피트니스",
  ];
  return (
    <div>
      <select onChange={(e) => categoryChangeHandler(e.target.value)}>
        <option>전체</option>
        {categoryOptions.map((option) => {
          return <option key={option}>{option}</option>;
        })}
      </select>
    </div>
  );
}

export default Category;
