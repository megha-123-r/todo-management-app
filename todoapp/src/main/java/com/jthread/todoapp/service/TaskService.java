package com.jthread.todoapp.service;

import java.util.List;

import com.jthread.todoapp.model.Task;
import com.jthread.todoapp.model.Task.Priority;
import com.jthread.todoapp.model.Task.Status;

public interface TaskService {

	Task saveTask(Task task);

	List<Task> listTasks();

	Task getTaskById(int id);

	Task updateTask(int id, Task task);

	void deleteTask(int id);

	Task markAsCompleted(int id);

	List<Task> searchByTitle(String title);

	List<Task> searchByPriority(Priority priority);

	List<Task> filterByStatus(Status status);
}
