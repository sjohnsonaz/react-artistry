declare var window: any;

import * as React from 'react';
import * as ReactDom from 'react-dom';

import { Container, BodyScroll, DepthStack, Portal } from '../../../scripts/modules/ArtistryReact';

import ButtonView from './views/button/ButtonView';
import RangeView from './views/range/RangeView';
import ToggleView from './views/toggle/ToggleView';
import CalendarView from './views/calendar/CalendarView';
import ProgressBarView from './views/progressBar/ProgressBarView';
import MenuBarView from './views/menuBar/MenuBarView';
import ModalView from './views/modal/ModalView';
import SectionView from './views/section/SectionView';
import CarouselView from './views/carousel/CarouselView';
import TabView from './views/tab/TabView';
import TableView from './views/table/TableView';
import PagerView from './views/pager/PagerView';
import ListView from './views/list/ListView';
import FormView from './views/form/FormView';
import FileUploadView from './views/file-upload/FileUploadView';
import CodeView from './views/code/CodeView';
import DrawerView from './views/drawer/DrawerView';
import GridView from './views/grid/GridView';
import CardView from './views/card/CardView';

export default class Application {
    static run() {
        BodyScroll.init();
        DepthStack.init();
        Portal.addElement('modal-root', 'modal-root');
        ReactDom.render(
            <Container menuBarTop>
                <MenuBarView />
                <h2>Components</h2>
                <ButtonView />
                <RangeView />
                <ToggleView />
                <CalendarView />
                <ProgressBarView />
                <ModalView />
                <DrawerView />
                <SectionView />
                <CarouselView />
                <TabView />
                <TableView />
                <PagerView />
                <ListView />
                <FormView />
                <FileUploadView />
                <CodeView />
                <GridView />
                <CardView />
            </Container>,
            document.getElementById('root'),
        );
    }
}
