import React, { Component } from "react";
import CardGame from './CardGame';
import moment from 'moment';

class Noticias extends Component {


    handleDelete = (id)=>{
       // alert(id);
        var url = `http://localhost:4000/api/news/${id}`;
        fetch(url, {
            method: 'put',
            mode: 'cors',
            headers: new Headers({
              'Content-Type': 'application/json',
            }),
            body: JSON.stringify({deleted:true})
          })
          .then((respuesta) => respuesta.json())
          .then((resultado) => this.props.consultarApi())//console.log(resultado))
          .catch(() => console.log("Can’t access "+url+" response. Blocked by browser?"));
    }

    mostrarNoticias = () => {
        const noticias = this.props.noticias;

        if (noticias.length === 0) return null;

        const items = [];
       
        let fecha ="";
        for (let x in noticias.News) {
            var now = moment(new Date()); //todays date
            var end = moment(noticias.News[x].created_at); // another date
            var duration = moment.duration(end.diff(now));
            var days = duration.asDays();
            var horas = duration.asHours();
            if(Math.round(days*-1)<1){
             //   console.log("hace "+Math.round(duration.asHours()*-1)+" horas");
             fecha = "hace "+Math.round(duration.asHours()*-1)+" horas";
            }
            if(Math.round(days*-1)>1){
            fecha = "hace "+Math.round(days*-1)+" días";
            }
            if(Math.round(days*-1) > 7){
            fecha = "hace "+Math.round(duration.asWeeks()*-1)+" semanas";
            }
            if(Math.round(horas*-1)<1){
                //   console.log("hace "+Math.round(duration.asHours()*-1)+" horas");
                fecha = "hace "+Math.round(duration.asMinutes()*-1)+" minutos";
            }
            items.push(
                <React.Fragment key={x} >
                    {/* <CardGame clave={x} modal={this.modal} url={noticias[0][x].url} image={noticias[0][x].image.url_image} alt={noticias[0][x].image.alt} name={noticias[0][x].name} /> */}
                    {/* <tr className="table-default"> */}
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-1">
                    <div className="list-group">
                        <a href="#" className="list-group-item list-group-item-action flex-column align-items-start active">
                            <div className="d-flex w-100 justify-content-between">
                            <a href={noticias.News[x].story_url} target="_blank">
                            <h5 className="mb-1">{noticias.News[x].story_title}</h5>
                            </a>
                                <small>{fecha}
                                <button type="button" className="ml-2 mb-1 close" onClick={()=>this.handleDelete(noticias.News[x]._id)} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                </small>
                            </div>
                            <p className="mb-1" >{noticias.News[x].comment_text}</p>
                            <small>{noticias.News[x].author}</small>
                        </a>
                    </div>
                    </div>
                    {/* </tr> */}
                </React.Fragment>
            )
        }


        return (
            <React.Fragment>
                {/* <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Noticias</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                </table> */}
                     {items}
            </React.Fragment>
        )
    }

    render() {
        

        return (
            <React.Fragment>
                <div key={"aaaa"} className="col-12 p-5 row">
                    {this.mostrarNoticias()}
                </div>
            </React.Fragment>
        );
    };
}

export default Noticias;