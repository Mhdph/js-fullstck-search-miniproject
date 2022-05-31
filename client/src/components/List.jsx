import React from "react";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

import axios from "axios";
import "./List.css";

function List() {
  const [userList, setUserList] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const date = new Date().toISOString().slice(0, 19).replace("T", " ");
  const userPerPage = 3;
  const pagesVisited = pageNumber * userPerPage;
  const displayUsers = userList
    .slice(pagesVisited, pagesVisited + userPerPage)
    .map((usr) => (
      <div className="flex p-5 bg-white border border-gray-200 h-36 rounded-lg shadow">
        <form className="flex-auto p-2">
          <div className="flex flex-col mr-8">
            <h1 className="flex-auto text-xl text-right text-gray-900">
              {usr.name} {usr.family}
            </h1>
            <div className="text-sm font-medium mt-4 text-right text-gray-700">
              {usr.work}
            </div>
            <div className="w-full mt-4 flex-none text-right text-sm font-medium text-gray-700">
              سن: {usr.age}
            </div>
          </div>
        </form>
        <div className="flex-none w-20 md:w-28 md:h-28 relative">
          <img
            src={usr.profile_image}
            alt="shopping"
            className="absolute rounded-lg inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    ));
  const pageCount = Math.ceil(userList.length / userPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/getall`);
        setUserList(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [work, setWork] = useState("");
  const [family, setFamily] = useState("");

  const reFetch = async () => {
    try {
      const res = await axios.get(
        `/search?name=${name}&age=${age}&family=${family}&work=${work}`
      );
      setUserList(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const submitReview = () => {
    axios.post("/api/insert", {
      name: name,
      age: age,
      work: work,
      family: family,
      date: date,
    });
  };

  const handleClick = () => {
    reFetch();
    setPageNumber(0);
    submitReview();
  };

  return (
    <div className="py-4">
      <div className="flex p-6 flex-row">
        <button
          type="button"
          disabled=""
          onClick={handleClick}
          className="py-2 px-4 mr-3 bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  opacity-70 cursor-pointer rounded-lg "
        >
          جست و جو
        </button>
        <input
          onChange={(e) => setAge(e.target.value)}
          type="text"
          className="text-center mr-3 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="سن"
        />
        <input
          onChange={(e) => setWork(e.target.value)}
          type="text"
          className="text-center  mr-3 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="شغل"
        />
        <input
          onChange={(e) => setFamily(e.target.value)}
          type="text"
          className="text-center  mr-3 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="نام خانوادگی"
        />
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="text-center  rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="نام "
        />
      </div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          {displayUsers}
        </div>
        <div className="px-5 bg-white py-1 flex flex-col xs:flex-row items-center xs:justify-between">
          <div id="page" className="flex items-center">
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              pageRangeDisplayed={1}
              marginPagesDisplayed={1}
              breakLabel="..."
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
