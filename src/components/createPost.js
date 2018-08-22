import React, {Component} from 'react'

export default class createPost extends Component{
    render() {
        return(
            <div className="create-comp" >
                <h2 className="text-center m-3" >Creando Empresa</h2>
                <form onSubmit={this.props.submit} className="form-comp" >
                    <div className="form-group text-left">
                        <label for="formGroupExampleInput">Nombre de la Empresa</label>
                        <input type="text" className="form-control input-comp" name="Tema" placeholder="Genesis"/>
                    </div>
                    <div className="form-group text-left">
                        <label for="formGroupExampleInput">CIF</label>
                        <input type="number" className="form-control input-comp" name="cif" placeholder="1234"/>
                    </div>
                    <div className="form-group text-left">
                        <label for="formGroupExampleInput">Clave de Ingreso</label>
                        <input type="password" className="form-control input-comp" name="ingreso"/>
                    </div>
                    <div className="form-group text-left">
                        <label for="formGroupExampleInput">Director de la Empresa</label>
                        <input type="text" className="form-control input-comp" name="director" placeholder="Phil Collins"/>
                    </div>
                    <div className="form-group text-left">
                        <label for="formGroupExampleInput">Fecha de Constitución</label>
                        <input type="date" className="form-control input-comp" name="date"/>
                    </div>
                    <div className="form-group text-left">
                        <label for="formGroupExampleInput">Dirección</label>
                        <input type="text" className="form-control input-comp" name="direccion" placeholder="Calle 2, Tegucigalpa M.D.C, FM, Honduras"/>
                    </div>
                    <div className="form-group text-left">
                        <button type="submit" className="btn btn-primary btn-block">Inscribirse</button>
                    </div>
                </form>
            </div>
        )
    }
}