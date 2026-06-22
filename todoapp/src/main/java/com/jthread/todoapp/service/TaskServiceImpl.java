package com.jthread.todoapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jthread.todoapp.exception.TaskNotFoundException;
import com.jthread.todoapp.model.Task;
import com.jthread.todoapp.model.Task.Priority;
import com.jthread.todoapp.model.Task.Status;
import com.jthread.todoapp.repository.TaskRepository;

@Service
public class TaskServiceImpl implements TaskService {

	@Autowired
	private TaskRepository taskRepository;

	@Override
	public Task saveTask(Task task) {
		if (task.getStatus() == null) {
			task.setStatus(Status.PENDING);
		}
		return taskRepository.save(task);
	}

	@Override
	public List<Task> listTasks() {
		return taskRepository.findAll();
	}

	@Override
	public Task getTaskById(int id) {
		return taskRepository.findById(id)
				.orElseThrow(() -> new TaskNotFoundException("Task Not Found with id " + id));
	}

	@Override
	public Task updateTask(int id, Task task) {
		Task dbTask = taskRepository.findById(id)
				.orElseThrow(() -> new TaskNotFoundException("Task Not Found with id " + id));
		dbTask.setTitle(task.getTitle());
		dbTask.setDescription(task.getDescription());
		dbTask.setPriority(task.getPriority());
		dbTask.setDueDate(task.getDueDate());
		return taskRepository.save(dbTask);
	}

	@Override
	public void deleteTask(int id) {
		Task task = taskRepository.findById(id)
				.orElseThrow(() -> new TaskNotFoundException("Task Not Found with id " + id));
		taskRepository.delete(task);
	}

	@Override
	public Task markAsCompleted(int id) {
		Task task = taskRepository.findById(id)
				.orElseThrow(() -> new TaskNotFoundException("Task Not Found with id " + id));
		task.setStatus(Status.COMPLETED);
		return taskRepository.save(task);
	}

	@Override
	public List<Task> searchByTitle(String title) {
		return taskRepository.findByTitleContainingIgnoreCase(title);
	}

	@Override
	public List<Task> searchByPriority(Priority priority) {
		return taskRepository.findByPriority(priority);
	}

	@Override
	public List<Task> filterByStatus(Status status) {
		return taskRepository.findByStatus(status);
	}
}
