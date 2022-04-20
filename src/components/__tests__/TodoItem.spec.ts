import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TodoItem from "../TodoItem.vue";
import type { VueNode } from "@vue/test-utils/dist/types";


describe("TodoItem", () => {
  const wrapper = mount(TodoItem, {
    props: {
      id: 0,
      title: 'test title',
      completed: true
    }
  })

  const inputCheckbox = wrapper.find('input[type="checkbox"]');

  it('Should contain', () => {
    expect(TodoItem).toBeTruthy();

    expect(inputCheckbox.exists()).toBeTruthy();
    expect(wrapper.find('p.todo-item__title').exists()).toBeTruthy();
    expect(wrapper.find('div.todo-item__delete-button').exists()).toBeTruthy();
  })

  const inputCheckboxElement = inputCheckbox.element as VueNode<HTMLInputElement>;

  it('Should display', () => {
    expect(wrapper.text()).toContain('test title');
    expect(inputCheckboxElement.checked);
  })
})

