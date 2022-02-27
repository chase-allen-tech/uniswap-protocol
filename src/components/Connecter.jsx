import React from "react";

const Connecter = () => {


  const onClick = () => {
    alert("clicked");
  };

  return <>
    <div>
      <div className="bg-white p-connecter">
        <div className="">
          <button onClick={onClick} className="btn-connecter border-0 text-wallet">CONNECT WALLET</button>
        </div>
        <div className="btn-connecter d-flex align-items-center p-metamask" style={{ marginTop: 12 }}>
          <img src="/metamask.png" className="size-36" alt="" />
          <div className="ml-3 text-address">0x7c8d1c...sda21</div>

          <button className="p-0 border-0 bg-transparent d-flex justify-content-center align-items-center ml-2">
            <i className="material-icons">expand_more</i>
          </button>
        </div>
      </div>
    </div>
  </>;
};

export default Connecter;