import React from 'react';
import styled from 'styled-components';

const Modal = ({children, estado, cambiarEstado}) => {
    
    return (
        <div>
            {!estado &&
                <Overlay>
                    <ContenedorModal>
                        <EncabezadoModal>
                            <h2>Marvel´s Heroes</h2>
                        </EncabezadoModal>
                        <BotonCerrar >
                            <a to="#" className="btn-floating btn-large red"><i className="medium material-icons">close</i></a>
                        </BotonCerrar>
                        {children}
                    </ContenedorModal>
                </Overlay>
            }
        </div>
    );
}

export default Modal;

const Overlay = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.5);
    padding: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ContenedorModal = styled.div`
    width: 80%;
    min-heigt: 100px;
    background: #fff;
    position: relative;
    border-radius: 5px;
    box-shadow: rgba(100,100,111,0.2) 0px 7px 20px 0px;
    padding: 20px;
`;

const EncabezadoModal = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 20px
    border-bottom: 1px solid #E8E8E8;

    h2{
        font-weigth: 500;
        font-size: 32px;
    }

`;

const BotonCerrar = styled.div`
    position: absolute;
    top: 40px;
    right: 40px;
    background: none;
    border: none;
`;