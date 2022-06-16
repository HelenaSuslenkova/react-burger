import {
  WS_GET_DATA,
} from "../action-types/ws";
import {
  wsGetData,
} from "./ws";

const mockFeed = {
  orders: [
    {
      ingredients: ["test1", "test2"],
      createdAt: "060606",
      name: "test",
      number: 42,
      status: "test",
      updatedAt: "060606",
      _id: "testid",
    },
  ],
  success: true,
  total: 42,
  totalToday: 42,
};

describe("WS actions", () => {
  describe("WS actions creators", () => {
    it("creates ws get message correctly", () => {
      expect(wsGetData(mockFeed)).toEqual({
        type: WS_GET_DATA,
        payload: mockFeed,
      });
    });
  });
});
