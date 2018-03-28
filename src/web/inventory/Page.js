import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MdStarOutline from 'react-icons/lib/md/star-outline'
import MdStar from 'react-icons/lib/md/star'

import { inventoryStoreList } from './reducer'
import { connectStoreList } from '../shared/connectStoreList'
import Page from '../shared/Page'
import PageBody from '../shared/PageBody'
import Subtitle from '../shared/Subtitle'
import PageSubheader from '../shared/PageSubheader'
import Card, { CardBody } from '../shared/Card'
import Table from '../shared/table/Table'
import TableHead from '../shared/table/TableHead'
import TableRow from '../shared/table/TableRow'
import TableCell from '../shared/table/TableCell'
import Sidebar from '../shared/Sidebar'
import Button from '../shared/Button'

import EditItemForm from './EditItemForm'
import { createOfflineId } from '../shared/offline.utils'
import Currency from '../shared/Currency'
import Tooltip from '../shared/Tooltip'

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
            isEditSidebarOpen: true,
        })
    }

    closeSidebarAndClearItem() {
        this.setState({
            itemForEdit: null,
            isEditSidebarOpen: false,
        })
    }

    onRequestClose = () => {
        this.closeSidebarAndClearItem()
    }

    dismissEditForm = () => {
        this.closeSidebarAndClearItem()
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
                <Sidebar
                    isOpen={this.state.isEditSidebarOpen}
                    onRequestClose={this.onRequestClose}
                >
                    <EditItemForm
                        item={this.state.itemForEdit}
                        onSubmit={this.onSubmit}
                        onDismiss={this.dismissEditForm}
                    />
                </Sidebar>

                <PageSubheader>
                    <Button flat color="primary" onClick={this.openNew}>
                        Nova Stavka
                    </Button>
                </PageSubheader>

                <PageBody>
                    <Subtitle>Trenutno Stanje</Subtitle>
                    <Table>
                        <TableHead
                            columns={[
                                'Naziv',
                                'Tip',
                                'Brand',
                                'Cijena',
                                'Kolicina',
                                'Mjera',
                                'Opcije',
                            ]}
                        />

                        {this.props.listData.map(item => (
                            <TableRow key={item._id}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.type}</TableCell>
                                <TableCell>{item.brand_name}</TableCell>
                                <TableCell>
                                    <Currency currency={item.currency}>
                                        {item.price}
                                    </Currency>
                                </TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{item.unit}</TableCell>
                                <TableCell noPadding align="center">
                                    <Tooltip
                                        title={
                                            item.favorite_id
                                                ? 'Ukloni iz favorita'
                                                : 'Dodaj u favorite'
                                        }
                                    >
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
                                    </Tooltip>
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
