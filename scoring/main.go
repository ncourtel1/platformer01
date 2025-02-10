package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"sort"
	"strconv"
	"sync"
)

type Score struct {
	Name  string `json:"name"`
	Score int    `json:"score"`
	Time  string `json:"time"`
}

var (
	scores []Score
	mu     sync.Mutex
)

const filePath = "scores.json"

func loadScores() {
	file, err := os.ReadFile(filePath)
	if err == nil {
		json.Unmarshal(file, &scores)
	}
}

func saveScores() {
	data, _ := json.Marshal(scores)
	os.WriteFile(filePath, data, 0644)
}

func addScore(w http.ResponseWriter, r *http.Request) {
	var newScore Score
	if err := json.NewDecoder(r.Body).Decode(&newScore); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	mu.Lock()
	scores = append(scores, newScore)
	sort.Slice(scores, func(i, j int) bool {
		return scores[i].Score > scores[j].Score
	})
	saveScores()
	mu.Unlock()

	w.WriteHeader(http.StatusCreated)
}

func getScores(w http.ResponseWriter, r *http.Request) {
	page, _ := strconv.Atoi(r.URL.Query().Get("page"))
	if page < 1 {
		page = 1
	}
	perPage := 5
	start := (page - 1) * perPage
	end := start + perPage
	if end > len(scores) {
		end = len(scores)
	}

	mu.Lock()
	data, _ := json.Marshal(scores[start:end])
	mu.Unlock()

	w.Header().Set("Content-Type", "application/json")
	w.Write(data)
}

func main() {
	loadScores()
	fs := http.FileServer(http.Dir("../"))
	http.Handle("/", fs)
	http.HandleFunc("/scores", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodPost {
			addScore(w, r)
		} else if r.Method == http.MethodGet {
			getScores(w, r)
		} else {
			http.Error(w, "Invalid Method", http.StatusMethodNotAllowed)
		}
	})

	fmt.Println("Server running on http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
