import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import TodosView from "@/views/TodosView.vue";

describe("Todos View", () => {
  const wrapper = mount(TodosView);
  const todoTextInput = wrapper.find(`[data-test="Text Input"]`);
  const addButton = wrapper.find(`[data-test="Add Button"]`);
  
  it("Contains a text input field and add button", () => {
    todoTextInput.exists();
    addButton.exists();
  });

  it("Displays todos", () => {
    expect(wrapper.text()).toBe('Booger');
  });

  it("The form does not allow more than 35 characters", () => {
    todoTextInput.setValue(
      "This is going to be longer than 35 characters so I can test the character limit."
    );
    expect(todoTextInput.text.length <= 35);
  });

  it("Unable to submit new todo if text field is empty", async () => {
    await todoTextInput.setValue("");
    expect(addButton.attributes().disabled).toBeDefined();
  });
  
  it("Submit new todo if text field is not empty", async () => {
    await todoTextInput.setValue("Test text");
    expect(addButton.attributes().disabled).toBeUndefined();
  });
  
  it.todo("Displays todos from the array.");

  it.todo("Moves completed todos to the end of the array.");
});
