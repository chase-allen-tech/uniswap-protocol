import React from "react";

const Swap = () => {


  const onClick = () => {
    alert("clicked");
  };

  return <>
    <div>
      <div className="px-4 py-4 bg-white rounded-20">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="title">Swap</h2>
          <div className="d-flex ml-auto">
            <button className="p-0 border-0 bg-transparent hover-op">
              <i className="material-icons color-icon">history</i>
            </button>
            <button className="p-0 border-0 bg-transparent hover-op" style={{ marginLeft: 18 }}>
              <i className="material-icons material-icons-outlined color-icon">settings</i>
            </button>
          </div>
        </div>

        <div className="bg-card rounded-12 mt-4">
          <div className="d-flex justify-content-between align-items-center px-12x py-10x">
            <div className="subtitle">From</div>
            <div className="text-balance">Balance: 136 BNB</div>
          </div>
          <hr className="m-0 color-line" />
          <div className="px-12x py-10x d-flex align-items-center">
            {/* <div className="size-32">IMG</div> */}
            <img src="/bnb.png" alt="" className="size-32" />
            <div className="ml-2 font-weight-bold text-token mr-3">BNB</div>
            <input type="text" className="input-field ml-auto" placeholder="Enter Amount" />
          </div>
        </div>

        <div className="d-flex w-100 justify-content-center my-3">
          <i className="material-icons">arrow_downward</i>
        </div>

        <div className="bg-card rounded-12 mt-4">
          <div className="d-flex justify-content-between align-items-center px-12x py-10x">
            <div className="subtitle">To</div>
          </div>
          <hr className="m-0 color-line" />
          <div className="px-12x py-10x d-flex align-items-center">
            {/* <div className="size-32">IMG</div> */}
            <img src="/mochi.png" alt="" className="size-32" />
            <div className="ml-2 font-weight-bold text-token mr-3">MOCHI</div>
            <input type="text" className="input-field ml-auto" placeholder="Enter Amount" disabled />
          </div>
        </div>

        <div style={{ marginTop: 40 }}>
          <button className="w-100 btn-connect border-0 text-white d-flex justify-content-center align-items-center hover-op">
            <div>
              <i className="material-icons text-white">swap_vert</i>
            </div>
            <div className="btn-text ml-2">Convert</div>
          </button>
        </div>

      </div>
    </div>
  </>;
};

export default Swap;