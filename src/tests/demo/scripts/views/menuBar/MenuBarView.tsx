import * as React from 'react';

import { Button, MenuBar, MenuBarLink, Popover, Section, UserThumbnail } from '../../../../../scripts/modules/ArtistryReact';

export interface IMenuBarViewProps {

}

export interface IMenuBarViewState {
    userMenuOpen: boolean;
}

export default class MenuBarView extends React.Component<IMenuBarViewProps, IMenuBarViewState> {
    constructor(props?: IMenuBarViewProps) {
        super(props);
        this.state = {
            userMenuOpen: false
        };
    }

    toggleUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        this.setState({ userMenuOpen: !this.state.userMenuOpen });
    }

    closeUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        this.setState({ userMenuOpen: false });
    }
    render() {
        return (
            <MenuBar
                top
                title="React Artistry"
            >
                <MenuBarLink
                    active
                    title="Home"
                    href="#"
                />
                <li className="menu-spacer"></li>
                <MenuBarLink
                    title={
                        <UserThumbnail
                            src="https://placebear.com/50/50"
                            placeholder="C"
                            size="small"
                            popover={"Logout"}
                            popoverDirection="bottom"
                            popoverAlign="right"
                        />
                    }
                />
                <MenuBarLink
                    title={
                        <UserThumbnail
                            src=""
                            placeholder="C"
                            size="small"
                            onClick={this.toggleUserMenu}
                            popover={"Logout"}
                            popoverDirection="bottom"
                            popoverAlign="right"
                            popoverMenu
                            popoverOpen={this.state.userMenuOpen}
                            menuBarTop
                            onPopoverClose={this.closeUserMenu}
                        />
                    }
                />
            </MenuBar>
        );
    }
}
