import React from 'react';
import StarRating from './StarRating';
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"

it('renders 5 stars by normal', () => {
  const { getAllByTestId } = render(<StarRating />);
  const normalStars = getAllByTestId("star-normal");
  expect(normalStars).toHaveLength(5);
});

it('renders a specified number of stars', () => {
  const { getAllByTestId } = render(<StarRating starCount={10} />);
    const normalStars = getAllByTestId("star-normal");
    expect(normalStars).toHaveLength(10);
});

it('renders empty stars with color #bbb by normal', () => {
    const { getAllByTestId } = render(<StarRating />);
    const bbbStars = getAllByTestId("star-normal");
    expect(bbbStars[0].childNodes[0]).toHaveAttribute("color", "#bbb")
});

it('renders empty stars with the color of the emptyColor value', () => {
    const { getAllByTestId } = render(<StarRating emptyColor={"#000"}/>);
    const blackStars = getAllByTestId("star-normal");
    expect(blackStars[0].childNodes[0]).toHaveAttribute("color", "#000")
});

it('renders filled stars as yellow by normal', () => {
  const { getAllByTestId } = render(<StarRating value={1}/>);
    const yellowStars = getAllByTestId("star-normal");
    expect(yellowStars[0].childNodes[0]).toHaveAttribute("color", "yellow")
});

it('renders filled stars with the color of the filledColor value', () => {
  const { getAllByTestId } = render(<StarRating value={1} filledColor={"gold"} />);
    const goldStars = getAllByTestId("star-normal");
    expect(goldStars[0].childNodes[0]).toHaveAttribute("color", "gold")
});

it('renders a star using the 1x size by normal', () => {
  const { getAllByTestId } = render(<StarRating/>);
    const smallStars = getAllByTestId("star-normal");
    expect(smallStars[0].childNodes[0]).toHaveClass("fa-1x")
});

it('renders a star using the size value', () => {
  const { getAllByTestId } = render(<StarRating size={"3x"}/>);
    const largeStars = getAllByTestId("star-normal");
    expect(largeStars[0].childNodes[0]).toHaveClass("fa-3x")
});

it('renders 0 filled stars when value is 0', () => {
  const { container } = render(<StarRating value={0}/>);
    const zeroStars = container.querySelectorAll('.fa-star[emptyColor="#bbb"]')
    expect(zeroStars).toHaveLength(0);
});

it('renders filled stars equal to value when value is greater than 0', () => {
  const { container } = render(<StarRating value={3}/>);
    const threeStars = container.querySelectorAll('.fa-star[color="yellow"]')
    expect(threeStars).toHaveLength(3);
});

it('updates when clicking on an empty star', () => {
  const handle = jest.fn();
  const { getAllByTestId } = render(<StarRating onClick={handle} />);
  const unfilled = getAllByTestId("star-normal")
  fireEvent.click(unfilled[3])
  expect(handle).toHaveBeenCalledWith(4)

});

it('sets the value to 0 when clicking on a filled star', () => {
  const handle = jest.fn();
  const { getAllByTestId } = render(<StarRating value={4} onClick={handle} />);
  const unfilled = getAllByTestId("star-normal")
  fireEvent.click(unfilled[3])
  expect(handle).toHaveBeenCalledWith(0)
});
