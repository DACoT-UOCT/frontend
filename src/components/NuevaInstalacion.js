import React from "react";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";

const NuevoSemaforo = () => {
  return (
    <div className="grid-item nuevo-semaforo">
      <p>
        <u>Formulario para nuevo semaforo</u>
      </p>
      <Form>
        <Row form>
          <Col sm={4}>
            <FormGroup>
              <Label>Junction</Label>
              <Input
                bsSize="sm"
                type="text"
                name="junction"
                placeholder="J000000"
              />
            </FormGroup>
          </Col>
          <Col sm={2}></Col>
          <Col sm={4}>
            <FormGroup>
              <Label>Comuna</Label>
              <Input
                bsSize="sm"
                type="text"
                name="comuna"
                placeholder="Comuna"
              />
            </FormGroup>
          </Col>
        </Row>

        <Row form>
          <Col sm={10}>
            <FormGroup>
              <Label>Cruce</Label>
              <Input
                bsSize="sm"
                type="text"
                name="cruce"
                placeholder="Calle - Calle"
              />
            </FormGroup>
          </Col>
        </Row>

        <Row form>
          <Col sm={4}>
            <FormGroup>
              <Label>Código Cruce</Label>
              <Input
                bsSize="sm"
                type="text"
                name="cod-cruce"
                placeholder="0000"
              />
            </FormGroup>
          </Col>
        </Row>

        <Row form>
          <Col sm={4}>
            <FormGroup>
              <Label>Controlador</Label>
              <Input
                bsSize="sm"
                type="text"
                name="controlador"
                placeholder="Marca - Modelo"
              />
            </FormGroup>
          </Col>
        </Row>

        <Row form>
          <Col sm={3}>
            <FormGroup>
              <Label>Num Etapas</Label>
              <Input
                bsSize="sm"
                type="text"
                name="num-etapas"
                placeholder="0"
              />
            </FormGroup>
          </Col>
          <Col sm={1}></Col>
          <Col sm={3}>
            <FormGroup>
              <Label>Mod Potencia</Label>
              <Input
                bsSize="sm"
                type="text"
                name="mod-potencia"
                placeholder="0"
              />
            </FormGroup>
          </Col>
          <Col sm={1}></Col>
          <Col sm={3}>
            <FormGroup>
              <Label>Detectores</Label>
              <Input
                bsSize="sm"
                type="text"
                name="detectores"
                placeholder="0"
              />
            </FormGroup>
          </Col>
        </Row>

        <hr className="separador"></hr>

        <legend>OTU</legend>
        <Row form>
          <Col sm={3}>
            <FormGroup>
              <Label>Marca</Label>
              <Input bsSize="sm" type="text" name="otu-marca" placeholder="" />
            </FormGroup>
          </Col>
          <Col sm={1}></Col>
          <Col sm={3}>
            <FormGroup>
              <Label>Tipo</Label>
              <Input bsSize="sm" type="text" name="otu-tipo" placeholder="" />
            </FormGroup>
          </Col>
          <Col sm={1}></Col>
          <Col sm={3}>
            <FormGroup>
              <Label>N° Serie</Label>
              <Input bsSize="sm" type="text" name="otu-serie" placeholder="" />
            </FormGroup>
          </Col>
        </Row>

        <Row form>
          <Col sm={10}>
            <FormGroup>
              <Label>Equipamientos</Label>
              <Input
                bsSize="sm"
                type="text"
                name="otu-equipamientos"
                placeholder=""
              />
            </FormGroup>
          </Col>
        </Row>

        <Row form>
          <Col sm={3}>
            <FormGroup>
              <Label>IP</Label>
              <Input bsSize="sm" type="text" name="otu-ip" placeholder="" />
            </FormGroup>
          </Col>
          <Col sm={1}></Col>
          <Col sm={3}>
            <FormGroup>
              <Label>N° Empalme</Label>
              <Input
                bsSize="sm"
                type="text"
                name="otu-empalme"
                placeholder=""
              />
            </FormGroup>
          </Col>
          <Col sm={1}></Col>
          <Col sm={3}>
            <FormGroup>
              <Label>Cap Empalme</Label>
              <Input
                bsSize="sm"
                type="text"
                name="otu-cap-empalme"
                placeholder=""
              />
            </FormGroup>
          </Col>
        </Row>

        <hr className="separador"></hr>

        <legend>UPS</legend>
        <Row form>
          <Col sm={3}>
            <FormGroup>
              <Label>Marca</Label>
              <Input bsSize="sm" type="text" name="ups-marca" placeholder="" />
            </FormGroup>
          </Col>
          <Col sm={1}></Col>
          <Col sm={3}>
            <FormGroup>
              <Label>Modelo</Label>
              <Input bsSize="sm" type="text" name="ups-modelo" placeholder="" />
            </FormGroup>
          </Col>
          <Col sm={1}></Col>
          <Col sm={3}>
            <FormGroup>
              <Label>N° Serie</Label>
              <Input bsSize="sm" type="text" name="ups-serie" placeholder="" />
            </FormGroup>
          </Col>
        </Row>

        <Row form>
          <Col sm={3}>
            <FormGroup>
              <Label>N° Capacidad</Label>
              <Input
                bsSize="sm"
                type="text"
                name="ups-capacidad"
                placeholder=""
              />
            </FormGroup>
          </Col>
          <Col sm={1}></Col>
          <Col sm={4}>
            <FormGroup>
              <Label>Duración Carga</Label>
              <Input
                bsSize="sm"
                type="text"
                name="ups-duracion"
                placeholder=""
              />
            </FormGroup>
          </Col>
        </Row>

        <Row form>
          <Col sm={10}>
            <FormGroup>
              <Label>Equipamientos</Label>
              <Input
                bsSize="sm"
                type="text"
                name="otu-equipamientos"
                placeholder=""
              />
            </FormGroup>
          </Col>
        </Row>

        <hr className="separador"></hr>

        <Row form>
          <FormGroup row>
            <Label sm={5}> GPS </Label>
            <Col sm={4}>
              <FormGroup check>
                <Label check>
                  {" "}
                  <Input type="radio" name="gps" />
                  Sí
                </Label>
              </FormGroup>
            </Col>
            <Col sm={3}>
              <FormGroup check>
                <Label check>
                  {" "}
                  <Input type="radio" name="gps" />
                  No
                </Label>
              </FormGroup>
            </Col>
          </FormGroup>
        </Row>

        <FormGroup>
          <Col sm={{ offset: 9 }}>
            <Button size="sm">Submit</Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
};

export default NuevoSemaforo;
