import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { inventoryStoreList } from './reducer'
import { connectStoreList } from '../shared/connectStoreList'
import Page from '../shared/Page'
import PageBody from '../shared/PageBody'
import PageSubheader from '../shared/PageSubheader'
import Card, { CardBody } from '../shared/Card'
import Table from '../shared/table/Table'
import TableHead from '../shared/table/TableHead'
import TableRow from '../shared/table/TableRow'
import TableCell from '../shared/table/TableCell'
import Modal from '../shared/modal'
import Button from '../shared/Button'

import EditItemForm from './EditItemForm'

class InventoryPage extends Component {
    static propTypes = {
        listData: PropTypes.array.isRequired,
        addListItem: PropTypes.func.isRequired,
        updateListItem: PropTypes.func.isRequired,
        removeListItem: PropTypes.func.isRequired,
    }

    state = {}

    openNew = () => {
        this.setState({
            itemForEdit: null,
            isEditModalOpen: true,
        })
    }

    render() {
        return (
            <Page hasSubheader>
                <Modal
                    isOpen={this.state.isEditModalOpen}
                    onRequestClose={this._executeAfterModalClose}
                >
                    <EditItemForm
                        client={this.state.itemForEdit}
                        onSubmit={this.submitProject}
                        onDismiss={this.dismiss}
                    />
                </Modal>

                <PageSubheader>
                    <Button flat color="primary" onClick={this.openNew}>
                        Novi Stavka
                    </Button>
                </PageSubheader>

                <PageBody>
                    <Table>
                        <TableHead columns={['Name']} />

                        {this.props.listData.map(item => (
                            <TableRow>
                                <TableCell>{item.name}</TableCell>
                            </TableRow>
                        ))}
                    </Table>
                </PageBody>
            </Page>
        )
    }
}

export default connectStoreList(inventoryStoreList)(InventoryPage)
