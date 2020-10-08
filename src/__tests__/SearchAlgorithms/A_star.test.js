import AStar from "../../algorithms/SearchAlgorithms/A_Star.js";
jest.mock("../../algorithms/SearchAlgorithms/A_Star.js");
describe("Test of the A_STAR algorithm", () => {
  it("Check constructor", () => {
    const astar = new AStar();
    expect(astar).toHaveBeenCalledTimes(1);
  });
});
