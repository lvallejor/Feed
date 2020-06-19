import React from "react";

const CardGame = (props) => {

    const { image, alt, name, modal, clave, url } = props;
    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card">
                <img key={name} src={image} alt={alt} className="card-img-top" onClick={() => modal(url)} />
                <div className="card-body">
                    <p className="card-text">{name}</p>
                    <a href="#" data-target={`#${clave}`} data-toggle="modal" className="btn btn-primary btn-block">Jugar</a>
                </div>
            </div>
        </div>
    );
}

export default CardGame;