import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils';
import Tictactoe from "../Tictactoe";
import { ContextProvider } from '../utils/ContextProvider';

test("tic tac toe test can play", async () => {
    render(
        <ContextProvider>
            <Tictactoe />
        </ContextProvider>);
    // prettier-ignore
    const [
        s1, s2, s3, // eslint-disable-line no-unused-vars
        s4, s5, s6, // eslint-disable-line no-unused-vars
        s7, s8, s9 // eslint-disable-line no-unused-vars
    ] = Array.from(screen.queryAllByRole('button'));

    expect(screen.getByText('Next player: X')).toBeInTheDocument();
    userEvent.click(s1);
    const gameStart = screen.getByText(/go to game start/i);
    expect(gameStart).toHaveAttribute('disabled')
    expect(gameStart).toHaveTextContent('current')
    expect(s1).toHaveTextContent('X');

    expect(screen.getByText('Next player: O')).toBeInTheDocument()
    userEvent.click(s5);
    const firstMove = screen.getByText(/go to move/i);
    expect(gameStart).not.toHaveAttribute('disabled');
    expect(gameStart).not.toHaveAttribute('current');
    expect(firstMove).toHaveAttribute('disabled');
    expect(firstMove).toHaveTextContent('current');
    expect(s5).toHaveTextContent('O');

    expect(screen.getByText('Next player: X')).toBeInTheDocument();
    userEvent.click(s7);
    expect(s7).toHaveTextContent('X');

    expect(screen.getByText('Next player: O')).toBeInTheDocument();
    userEvent.click(s6);
    expect(s6).toHaveTextContent('O');

    expect(screen.getByText('Next player: X')).toBeInTheDocument();
    userEvent.click(s4);
    expect(s4).toHaveTextContent('X');

    expect(screen.getByText('Winner: X')).toBeInTheDocument();
    userEvent.click(s8)
    expect(s8).toHaveTextContent('');


    act(() => {
        expect(JSON.parse(window.localStorage.getItem('board-persist')).present).toEqual(
            [
                'X', null, null,
                'X', 'O', 'O',
                'X', null, null
            ]
        )
    })

    //GameStart Click Test
    userEvent.click(gameStart)
    expect(s1).toHaveTextContent('X')
    expect(s5).toHaveTextContent('')
    expect(screen.queryAllByRole('listitem').length).toBe(5);

    act(() => {
        expect(JSON.parse(window.localStorage.getItem('board-persist')).present).toEqual(
            [
                'X', null, null,
                null, null, null,
                null, null, null
            ]
        )
    });

    //Restart Click Test
    const restart = screen.getByText(/Restart/i);
    userEvent.click(restart);
    expect(s1).toHaveTextContent('');
    expect(screen.queryAllByRole('listitem').length).toBe(0);

    act(() => {
        expect(JSON.parse(window.localStorage.getItem('board-persist')).present).toEqual(
            [
                null, null, null,
                null, null, null,
                null, null, null
            ]
        )
    });




})