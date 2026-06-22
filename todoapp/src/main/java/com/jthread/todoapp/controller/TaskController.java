package com.jthread.todoapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jthread.todoapp.model.Task;
import com.jthread.todoapp.model.Task.Priority;
import com.jthread.todoapp.model.Task.Status;
import com.jthread.todoapp.service.TaskService;

@RestController
@RequestMapping("/tc")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {

	@Autowired
	private TaskService taskService;

	@PostMapping("/save")
	public ResponseEntity<Task> saveTask(@RequestBody Task task) {
		return new ResponseEntity<Task>(taskService.saveTask(task), HttpStatus.CREATED);
	}

	@GetMapping("/list")
	public List<Task> listTasks() {
		return taskService.listTasks();
	}

	@GetMapping("/get/{id}")
	public ResponseEntity<Task> getTaskById(@PathVariable("id") int id) {
		return new ResponseEntity<Task>(taskService.getTaskById(id), HttpStatus.OK);
	}

	@PutMapping("/update/{id}")
	public Task updateTask(@PathVariable("id") int id, @RequestBody Task task) {
		return taskService.updateTask(id, task);
	}

	@DeleteMapping("/delete/{id}")
	public String deleteTask(@PathVariable("id") int id) {
		taskService.deleteTask(id);
		return "Deleted Successfully";
	}

	@PutMapping("/complete/{id}")
	public ResponseEntity<Task> markAsCompleted(@PathVariable("id") int id) {
		return new ResponseEntity<Task>(taskService.markAsCompleted(id), HttpStatus.OK);
	}

	@GetMapping("/searchByTitle")
	public List<Task> searchByTitle(@RequestParam("title") String title) {
		return taskService.searchByTitle(title);
	}

	@GetMapping("/searchByPriority")
	public List<Task> searchByPriority(@RequestParam("priority") Priority priority) {
		return taskService.searchByPriority(priority);
	}

	@GetMapping("/filter")
	public List<Task> filterByStatus(@RequestParam("status") Status status) {
		return taskService.filterByStatus(status);
	}
}
