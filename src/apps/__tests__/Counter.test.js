import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Counter from "../Counter";

afterEach(() => {
    window.localStorage.clear();
})


test("LocalStorage Save Item And Control", async () => {
    const { rerender } = render(<Counter />);
    const countInputBox = screen.getByRole('textbox', { name: /counter/i });
    userEvent.clear(countInputBox);
    userEvent.type(countInputBox, "4");

    const count = window.localStorage.getItem('count');

    const isSerialized = count === '"4"'

    if (isSerialized) {
        expect(countInputBox.value).toMatch(/4/i)
    } else if (count === '4') {
        expect(countInputBox.value).toMatch(/4/i)
    } else {
        throw new Error(
            `🚨 localStorage count değişiminde güncellenmiyor`,
        )
    }

    window.localStorage.setItem("count", "6");
    rerender(<Counter key="rerender" />);
    const newRenderInputBox = screen.getByRole('textbox', { name: /counter/i });
    if (!newRenderInputBox.value == "'6'") {
        throw new Error(`
            LocalStorage Yeni Değer Girildiğinde güncellenmiyor.
        `)
    }

    expect(newRenderInputBox.value).toMatch(/6/i);
})