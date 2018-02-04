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
import MdStar from 'react-icons/lib/md/star'
import MdStarOutline from 'react-icons/lib/md/star-outline'

import EditItemForm from './EditItemForm'
import { createOfflineId } from '../shared/offline.utils'

class InventoryPage extends Component {
    static propTypes = {
        listData: PropTypes.array.isRequired,
        addListItem: PropTypes.func.isRequired,
        updateListItem: PropTypes.func.isRequired,
        removeListItem: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.loadList({})
    }

    state = {}

    openNew = () => {
        this.setState({
            itemForEdit: null,
            isEditModalOpen: true,
        })
    }

    closeModalAndClearItem() {
        this.setState({
            itemForEdit: null,
            isEditModalOpen: false,
        })
    }

    onRequestClose = () => {
        this.closeModalAndClearItem()
    }

    dismissEditForm = () => {
        this.closeModalAndClearItem()
    }

    onSubmit = val => {
        if (val.shouldAddToFavorites) {
            console.log('add to fav')
        }

        this.props.addListItem({
            _id: createOfflineId(),
            ...val,
        })
    }

    render() {
        return (
            <Page hasSubheader>
                <Modal
                    isOpen={this.state.isEditModalOpen}
                    onRequestClose={this.onRequestClose}
                >
                    <EditItemForm
                        item={this.state.itemForEdit}
                        onSubmit={this.onSubmit}
                        onDismiss={this.dismissEditForm}
                    />
                </Modal>

                <PageSubheader>
                    <Button flat color="primary" onClick={this.openNew}>
                        Nova Stavka
                    </Button>
                </PageSubheader>

                <PageBody>
                    <Table>
                        <TableHead
                            columns={[
                                'Name',
                                'Tip',
                                'Brand',
                                'Cijena',
                                'Valuta',
                                'Kolicina',
                                'Mjera',
                                'Favorit',
                            ]}
                        />

                        {this.props.listData.map(item => (
                            <TableRow key={item._id}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.type}</TableCell>
                                <TableCell>{item.brand_name}</TableCell>
                                <TableCell>
                                    {item.price.$numberDecimal}
                                </TableCell>
                                <TableCell>{item.currency}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{item.unit}</TableCell>
                                <TableCell>
                                    <Button
                                        outline={!item.favorite_id}
                                        small
                                        iconOnly
                                    >
                                        {!item.favorite_id ? (
                                            <MdStarOutline />
                                        ) : (
                                            <MdStar />
                                        )}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </Table>
                </PageBody>
            </Page>
        )
    }
}

export default connectStoreList(inventoryStoreList)(InventoryPage)
