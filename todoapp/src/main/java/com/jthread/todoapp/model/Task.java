package com.jthread.todoapp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tasks")
public class Task {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;

	@Column(name = "title")
	private String title;

	@Column(name = "description")
	private String description;

	@Enumerated(EnumType.STRING)
	@Column(name = "priority")
	private Priority priority;

	@Column(name = "due_date")
	private String dueDate;

	@Enumerated(EnumType.STRING)
	@Column(name = "status")
	private Status status;

	public enum Priority {
		HIGH, MEDIUM, LOW
	}

	public enum Status {
		PENDING, COMPLETED
	}

	public Task() {
		this.status = Status.PENDING;
	}

	public Task(String title, String description, Priority priority, String dueDate) {
		this.title = title;
		this.description = description;
		this.priority = priority;
		this.dueDate = dueDate;
		this.status = Status.PENDING;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Priority getPriority() {
		return priority;
	}

	public void setPriority(Priority priority) {
		this.priority = priority;
	}

	public String getDueDate() {
		return dueDate;
	}

	public void setDueDate(String dueDate) {
		this.dueDate = dueDate;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "Task [id=" + id + ", title=" + title + ", description=" + description
				+ ", priority=" + priority + ", dueDate=" + dueDate + ", status=" + status + "]";
	}
}
