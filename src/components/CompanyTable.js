import React, {Component} from 'react';
import {Container, Table} from 'reactstrap';

class CompanyTable extends Component {

    componentDidMount() {


    }

    render() {
        return(
            <Container >
                <Table className="m-4">
                    <thead className="">
                    <tr>
                        <th>
                            Countries
                        </th>
                        <th className="">
                            Cities
                        </th>
                        <th className="">
                            Company
                        </th>
                        <th className="">
                            Map
                        </th>
                    </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </Table>
            </Container>
        )
    }
}

export default CompanyTable;
